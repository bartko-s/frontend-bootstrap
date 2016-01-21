<?php
require_once __DIR__ . '/src/server/src/App.php';

if(!defined('APP_ENVIRONMENT')) {
    define('APP_ENVIRONMENT', 'production');
}

define('APP_VERSION', '0.0.1');

$app->run();
