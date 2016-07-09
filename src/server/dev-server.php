<?php
define('APP_ENVIRONMENT', 'development');

$urlWithoutParams = current(explode("?", $_SERVER['REQUEST_URI'], 2));
$filePath = __DIR__ . $urlWithoutParams;

if (is_file($filePath)) {
    return false;
} else {
    include __DIR__ . '/../../index.php';
}