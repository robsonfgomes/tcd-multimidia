<?php

namespace App\Repository;

use App\Resource\AbstractRepository;

class MainRepository extends AbstractRepository {
	function obrasByEstado($estado) {
		$sql = "SELECT COUNT(*) Total FROM obras_pac.dados WHERE sig_uf = ?";
		$query = self::db()->executeQuery($sql, array($estado));
		$obras = $query->fetchAll();
		return $obras;
	}
}