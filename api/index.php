<?php

require_once 'vendor/autoload.php';

date_default_timezone_set('America/Araguaina');
setlocale(LC_ALL, 'pt_BR.utf-8');

$app = new Silex\Application();
$app['debug'] = true;

$app->get('/', function() use($app){
	return 'Hello World';
});

$app->get('hello/{name}', function($name) use($app){
	return 'Hello, '. $name;
});


$app->run();