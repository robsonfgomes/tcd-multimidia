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

    function getAllObrasByEstado($uf) {
        $sql = "SELECT
                idn_empreendimento
                ,idn_estagio
                ,val_lat
                ,val_long               
                FROM obras_pac.dados 
                WHERE val_lat <> ''
                AND val_long <> ''
                AND sig_uf = ?";
        $query = self::db()->executeQuery($sql, array($uf));
        $obras = $query->fetchAll();
        return $obras;
    }

    function getObra($idn_empreendimento) {
        $sql = "SELECT * FROM obras_pac.dados WHERE idn_empreendimento = ?";
        $query = self::db()->executeQuery($sql, array($idn_empreendimento));
        $obra = $query->fetch();
        return $obra;
    }

    function getQtObrasNaoIniciadasByEstado($sig_uf) {
        $sql = "SELECT COUNT(*) as qt FROM obras_pac.dados WHERE idn_estagio <= 10 AND sig_uf = ?";
        $query = self::db()->executeQuery($sql, array($sig_uf));
        $qt = $query->fetch();
        return $qt;
    }

    function getQtObrasEmConstrucaoByEstado($sig_uf) {
        $sql = "SELECT COUNT(*) as qt FROM obras_pac.dados WHERE idn_estagio > 10 AND idn_estagio <= 71 AND sig_uf = ?";
        $query = self::db()->executeQuery($sql, array($sig_uf));
        $qt = $query->fetch();
        return $qt;
    }

    function getQtObrasConcluidasByEstado($sig_uf) {
        $sql = "SELECT COUNT(*) as qt FROM obras_pac.dados WHERE idn_estagio > 71 AND sig_uf = ?";
        $query = self::db()->executeQuery($sql, array($sig_uf));
        $qt = $query->fetch();
        return $qt;
    }
}