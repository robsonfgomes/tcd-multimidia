<?php

namespace App\Repository;

use App\Resource\AbstractRepository;

class MainRepository extends AbstractRepository {
	function getAllObrasConcluidas() {
		$sql = "SELECT
				idn_empreendimento
				,val_lat
				,val_long				
		 		FROM obras_pac.dados 
		 		WHERE val_lat <> ''
		 		AND val_long <> ''
		 		AND idn_estagio = 90";
		$query = self::db()->executeQuery($sql);
		$obras = $query->fetchAll();
		return $obras;
	}
}