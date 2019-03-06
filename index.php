<?php
define('BUILD', '123');
?>

<!DOCTYPE html>
<html lang="sk">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Dev Stack</title>
    <link href="/static/build/index.styles.css?v=<?php echo BUILD;?>" rel="stylesheet" />
</head>
<body>
<div class="container-fluid">
    <div class="row">
        <div class="col align-self-center">
            <div id="react-root">React does not work :(</div>
        </div>
    </div>
</div>
    <script type="text/javascript" src="/static/build/vendor.bundle.js?v=<?php echo BUILD;?>" charset="utf-8"></script>
    <script type="text/javascript" src="/static/build/index.bundle.js?v=<?php echo BUILD;?>" charset="utf-8"></script>
</body>
</html>