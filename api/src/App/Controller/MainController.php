<?php

namespace App\Controller;

use Silex\Application;
use Silex\ControllerProviderInterface;
use App\Repository;

class MainController implements ControllerProviderInterface{	
	protected $db = null;

	public function __construct() {
		$this->repo = new \App\Repository\MainRepository();
	}

	public function connect(Application $app) {
		$routes = $app['controllers_factory'];
		$db = $this->repo;

		$routes->get('/', function() use($app){
			return 'Hello World';
		});

		$routes->get('obras/estado/{estado}', function($estado) use($app, $db) {
			$obras = $db->obrasByEstado($estado);
			return $app->json($obras);
		});

		return $routes;
	}
}