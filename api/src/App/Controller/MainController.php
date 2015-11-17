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

		$routes->get('obras/all/concluidas', function() use($app, $db) {
			$obras = $db->getAllObrasConcluidas();			

			return $app->json(getCoordenadasDD($obras));
		});

		function getCoordenadasDD($obras) {
			foreach ($obras as $key => $obra) {
				//latitude
				$obras[$key]['val_lat'] = str_replace('"','',$obras[$key]['val_lat']);
				$obras[$key]['val_lat'] = substr($obras[$key]['val_lat'],0,-1);
				$arr = array();
				$result = preg_match('/^(\d\d?).(\d\d?).(\d\d?(?:[.,]\d+)?).$/u', $obras[$key]['val_lat'], $arr);

				//convervento coordenadas de dms para dd			
				$obras[$key]['val_lat'] = '-';
				$obras[$key]['val_lat'] .= ($arr[1] + ($arr[2]/60) + ($arr[3]/3600));

				//longitude
				$obras[$key]['val_long'] = str_replace('"','',$obras[$key]['val_long']);
				$obras[$key]['val_long'] = substr($obras[$key]['val_long'],0,-1);
				$arr2 = array();
				$result = preg_match('/^(\d\d?).(\d\d?).(\d\d?(?:[.,]\d+)?).$/u', $obras[$key]['val_long'], $arr2);

				//convervento coordenadas de dms para dd			
				$obras[$key]['val_long'] = '-';
				$obras[$key]['val_long'] .= ($arr2[1] + ($arr2[2]/60) + ($arr2[3]/3600));
			}
			return $obras;
		}

		return $routes;
	}
}