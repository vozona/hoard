param(
  [Parameter(Mandatory = $true)]
  [ValidateSet('decode', 'encode')]
  [string]$Mode,

  [string]$Source = 'data/items.json',
  [string]$Decoded = 'data/items.decoded.json'
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Read-JsonFile {
  param([string]$Path)
  if (-not (Test-Path -LiteralPath $Path)) {
    throw "File not found: $Path"
  }
  return Get-Content -Raw -LiteralPath $Path | ConvertFrom-Json
}

if ($Mode -eq 'decode') {
  $data = Read-JsonFile -Path $Source

  if (-not $data.payload) {
    throw "No 'payload' field found in $Source"
  }

  $decodedText = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String([string]$data.payload))

  # Validate decoded JSON before writing.
  $null = $decodedText | ConvertFrom-Json

  Set-Content -LiteralPath $Decoded -Value $decodedText -Encoding UTF8
  Write-Host "Decoded JSON written to: $Decoded"
  exit 0
}

if ($Mode -eq 'encode') {
  if (-not (Test-Path -LiteralPath $Decoded)) {
    throw "Decoded file not found: $Decoded"
  }

  $decodedText = Get-Content -Raw -LiteralPath $Decoded

  # Validate JSON before packing to payload.
  $decodedObj = $decodedText | ConvertFrom-Json

  # Keep schemaVersion from decoded content if present; fallback to 2.
  $schemaVersion = 2
  if ($decodedObj.PSObject.Properties.Name -contains 'schemaVersion' -and $decodedObj.schemaVersion) {
    $schemaVersion = [int]$decodedObj.schemaVersion
  }

  $payload = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($decodedText))

  $wrapped = [ordered]@{
    schemaVersion = $schemaVersion
    payload = $payload
  }

  $json = $wrapped | ConvertTo-Json -Depth 100
  Set-Content -LiteralPath $Source -Value $json -Encoding UTF8
  Write-Host "Encoded payload written to: $Source"
  exit 0
}
