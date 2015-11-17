<?php

namespace App\Resource;

abstract class AbstractRepository {
	protected static $instance = null;

    /**
     * Cria uma conexão com o banco de dados, instância de \Doctrine\DBAL\Connection.
     *
     * @todo Ler os dados de um arquivo de configuração ao invés definí-los diretamente no código-fonte
     *
     * @return \Doctrine\DBAL\Connection|null
     * @throws \Doctrine\DBAL\DBALException
     */
    protected static function db() {
		if (!self::$instance) {
			$config = new \Doctrine\DBAL\Configuration();
			//$config->setSQLLogger(new EchoWriteSQLWithoutParamsLogger());
			$connectionParams = array(
				'dbname' => 'obras_pac',
				'user' => 'root',
				'password' => '',
				'host' => 'localhost',
				'driver' => 'pdo_mysql',
				'charset' => 'utf8'
			);
			self::$instance = \Doctrine\DBAL\DriverManager::getConnection($connectionParams, $config);
		}
		return self::$instance;
	}    
}