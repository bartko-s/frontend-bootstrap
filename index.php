<?php
// define('APP_ENVIRONMENT', 'production');
define('APP_ENVIRONMENT', 'development');

define('APP_VERSION', '0.0.1');

$urlWithoutParams = current(explode("?", $_SERVER['REQUEST_URI'], 2));
$filePath = __DIR__ . '/' . $urlWithoutParams;
if (is_file($filePath)) {
    return false;
}
?>

<!DOCTYPE html>
<html lang="sk">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dev Stack</title>
    <?php if (APP_ENVIRONMENT == 'production') {
        echo '<link href="/build/index.styles.css?v=' . APP_VERSION . '" rel="stylesheet" />';
    } ?>
</head>
<body>
<div class="circle">Dev</div>
<div class="ico"><span class="hide">Don't work</span></div>
<div class="counter">1</div>
<?php if (APP_ENVIRONMENT == 'production') {
    echo '<script type="text/javascript" src="/build/vendor.bundle.js?v=' . APP_VERSION . '" charset="utf-8"></script>';
    echo '<script type="text/javascript" src="/build/index.bundle.js?v=' . APP_VERSION . '" charset="utf-8"></script>';
} else {
    echo '<script type="text/javascript" src="http://localhost:8080/build/vendor.bundle.js" charset="utf-8"></script>';
    echo '<script type="text/javascript" src="http://localhost:8080/build/index.bundle.js" charset="utf-8"></script>';
} ?>
</body>
</html>