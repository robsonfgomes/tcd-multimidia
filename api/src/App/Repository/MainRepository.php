<?php

namespace App\Repository;

use App\Resource\AbstractRepository;

class MainRepository extends AbstractRepository {
    function getAllObrasConcluidas() {
        $sql = "SELECT
                idn_empreendimento
                ,idn_estagio
                ,val_lat
                ,val_long				
                FROM obras_pac.dados 
                WHERE val_lat <> ''
                AND val_long <> ''";
        $query = self::db()->executeQuery($sql);
        $obras = $query->fetchAll();
        return $obras;
    }
}