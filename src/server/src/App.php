<?php
require_once __DIR__ . '/../vendor/autoload.php';

class App
{
    public function run() {
        include __DIR__ . '/../templates/home.php';
    }
}

$app = new App();