param(
    [string]$Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path,
    [string]$SiteUrl = ''
)

$ErrorActionPreference = 'Stop'

function HtmlEscape([string]$Value) {
    return [System.Net.WebUtility]::HtmlEncode($Value)
}

function UrlEscape([string]$Value) {
    return [System.Uri]::EscapeDataString($Value)
}

function BuildPublicUrl([string]$Path) {
    $cleanPath = $Path.TrimStart('/')
    if (-not $SiteUrl) {
        return '../' + $cleanPath
    }

    return $SiteUrl.TrimEnd('/') + '/' + $cleanPath
}

function FirstText([object[]]$Values) {
    foreach ($value in $Values) {
        if ($null -ne $value) {
            $text = [string]$value
            if ($text.Trim().Length -gt 0) {
                return $text.Trim()
            }
        }
    }
    return ''
}

function NumberOrNull($Value) {
    if ($null -eq $Value -or [string]$Value -eq '') {
        return $null
    }

    $number = 0.0
    if ([double]::TryParse([string]$Value, [Globalization.NumberStyles]::Any, [Globalization.CultureInfo]::InvariantCulture, [ref]$number)) {
        return $number
    }

    return $null
}

function FormatCompactValue($Value) {
    if ($null -eq $Value) {
        return ''
    }

    $absolute = [Math]::Abs([double]$Value)
    $units = @(
        @{ Threshold = 1000000000; Suffix = 'B' },
        @{ Threshold = 1000000; Suffix = 'M' },
        @{ Threshold = 1000; Suffix = 'K' }
    )

    foreach ($unit in $units) {
        if ($absolute -ge $unit.Threshold) {
            $scaled = [double]$Value / $unit.Threshold
            $decimals = if ([Math]::Abs($scaled) -lt 10) { 1 } else { 0 }
            return $scaled.ToString("N$decimals", [Globalization.CultureInfo]::GetCultureInfo('pt-BR')).TrimEnd('0').TrimEnd(',') + $unit.Suffix
        }
    }

    return ([double]$Value).ToString('N0', [Globalization.CultureInfo]::GetCultureInfo('pt-BR'))
}

function GetMedianValue($Values) {
    $numbers = @($Values | ForEach-Object { NumberOrNull $_ } | Where-Object { $null -ne $_ } | Sort-Object)
    if ($numbers.Count -eq 0) {
        return $null
    }

    $middle = [Math]::Floor($numbers.Count / 2)
    if ($numbers.Count % 2 -eq 1) {
        return $numbers[$middle]
    }

    return [Math]::Round(($numbers[$middle - 1] + $numbers[$middle]) / 2)
}

$catalogPath = Join-Path $Root 'data/items.decoded.json'
$marketPath = Join-Path $Root 'data/items.market.json'
$shareDir = Join-Path $Root 'share'

$catalog = Get-Content -Raw -LiteralPath $catalogPath | ConvertFrom-Json
$market = Get-Content -Raw -LiteralPath $marketPath | ConvertFrom-Json

if (-not (Test-Path -LiteralPath $shareDir)) {
    New-Item -ItemType Directory -Path $shareDir | Out-Null
}

$siteTitle = 'Hoard SafraBr'
$siteDescription = 'Catalogo de itens, valores sugeridos e informacoes do Farming and Friends.'
$generated = 0

foreach ($item in $catalog.items) {
    $id = FirstText @($item.id)
    if (-not $id) {
        continue
    }

    $name = FirstText @($item.display.name, $item.name, $id)
    $category = FirstText @($item.classification.category, $item.category)
    $image = FirstText @($item.display.image, $item.image, 'img/default.jpg')
    $notes = FirstText @($item.notes, $item.description)
    $pricing = $market.pricing.$id
    $value = $null

    if ($pricing -and $pricing.history) {
        $value = GetMedianValue $pricing.history
    }

    if ($null -eq $value -and $item.pricing) {
        $value = NumberOrNull $item.pricing.value
    }

    $updated = FirstText @($pricing.lastUpdate, $item.pricing.lastUpdate)
    $descriptionParts = @()
    if ($category) { $descriptionParts += $category }
    if ($null -ne $value) { $descriptionParts += "Valor sugerido: $(FormatCompactValue $value)" }
    if ($updated) { $descriptionParts += "Atualizado em $updated" }
    if ($notes) { $descriptionParts += $notes }
    $description = if ($descriptionParts.Count -gt 0) { $descriptionParts -join ' - ' } else { $siteDescription }

    $targetUrl = if ($SiteUrl) { $SiteUrl.TrimEnd('/') + "/?item=$(UrlEscape $id)" } else { "../?item=$(UrlEscape $id)" }
    $imageUrl = BuildPublicUrl $image
    $title = "$name | $siteTitle"
    $filePath = Join-Path $shareDir "$id.html"

    $html = @"
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$(HtmlEscape $title)</title>
  <meta name="description" content="$(HtmlEscape $description)">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="$(HtmlEscape $siteTitle)">
  <meta property="og:title" content="$(HtmlEscape $title)">
  <meta property="og:description" content="$(HtmlEscape $description)">
  <meta property="og:image" content="$(HtmlEscape $imageUrl)">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="$(HtmlEscape $title)">
  <meta name="twitter:description" content="$(HtmlEscape $description)">
  <meta name="twitter:image" content="$(HtmlEscape $imageUrl)">
  <meta http-equiv="refresh" content="0; url=$(HtmlEscape $targetUrl)">
  <link rel="canonical" href="$(HtmlEscape $targetUrl)">
</head>
<body>
  <p><a href="$(HtmlEscape $targetUrl)">Abrir $(HtmlEscape $name) no Hoard SafraBr</a></p>
  <script>window.location.replace('$(HtmlEscape $targetUrl)');</script>
</body>
</html>
"@

    Set-Content -LiteralPath $filePath -Value $html -Encoding UTF8
    $generated++
}

Write-Output "Generated $generated static share pages in $shareDir"
