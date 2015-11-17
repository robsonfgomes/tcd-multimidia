<?php

require_once 'vendor/autoload.php';

date_default_timezone_set('America/Araguaina');
setlocale(LC_ALL, 'pt_BR.utf-8');

$app = new Silex\Application();
$app['debug'] = true;
$app->register(new \App\Resource\AngularPostRequestServiceProvider());


$app->mount('/', new \App\Controller\MainController());


$app->run();