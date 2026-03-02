<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
if ($raw === false || trim($raw) === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Empty payload']);
    exit;
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid JSON payload']);
    exit;
}

$catalogEncoded = $data['catalogEncoded'] ?? null;
$catalogDecoded = $data['catalogDecoded'] ?? null;
$market = $data['market'] ?? null;

if (!is_array($catalogEncoded) || !isset($catalogEncoded['payload'])) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid catalogEncoded']);
    exit;
}

if (!is_array($catalogDecoded) || !isset($catalogDecoded['items'])) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid catalogDecoded']);
    exit;
}

if (!is_array($market) || !isset($market['pricing'])) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid market']);
    exit;
}

$baseDir = __DIR__ . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR;
$itemsPath = $baseDir . 'items.json';
$decodedPath = $baseDir . 'items.decoded.json';
$marketPath = $baseDir . 'items.market.json';

$flags = JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES;

$itemsJson = json_encode($catalogEncoded, $flags);
$decodedJson = json_encode($catalogDecoded, $flags);
$marketJson = json_encode($market, $flags);

if ($itemsJson === false || $decodedJson === false || $marketJson === false) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Failed to encode JSON']);
    exit;
}

$okItems = file_put_contents($itemsPath, $itemsJson . PHP_EOL, LOCK_EX);
$okDecoded = file_put_contents($decodedPath, $decodedJson . PHP_EOL, LOCK_EX);
$okMarket = file_put_contents($marketPath, $marketJson . PHP_EOL, LOCK_EX);

if ($okItems === false || $okDecoded === false || $okMarket === false) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Failed to write one or more files']);
    exit;
}

echo json_encode(['ok' => true]);
