<?php
use Zend\Mvc\Application;
use Zend\Stdlib\ArrayUtils;

/**
 * This makes our life easier when dealing with paths. Everything is relative
 * to the application root now.
 */
chdir(dirname(__DIR__));
ini_set("display_errors", "On");
error_reporting(E_ALL);
@session_start();
header('Content-Type:text/html; charset=utf-8');
date_default_timezone_set('PRC');
// Decline static file requests back to the PHP built-in webserver
if (php_sapi_name() === 'cli-server') {
    $path = realpath(__DIR__ . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
    if (__FILE__ !== $path && is_file($path)) {
        return false;
    }
    unset($path);
}

// Composer autoloading
include __DIR__ . '/../vendor/autoload.php';
include __DIR__ . '/../config.php';
if (! class_exists(Application::class)) {
    throw new RuntimeException(
        "Unable to load application.\n"
        . "- Type `composer install` if you are developing locally.\n"
        . "- Type `vagrant ssh -c 'composer install'` if you are using Vagrant.\n"
        . "- Type `docker-compose run zf composer install` if you are using Docker.\n"
    );
}

// Retrieve configuration
$appConfig = require __DIR__ . '/../config/application.config.php';
if (file_exists(__DIR__ . '/../config/development.config.php')) {
    $appConfig = ArrayUtils::merge($appConfig, require __DIR__ . '/../config/development.config.php');
}

/**
 * 防xss
 */
//引入过滤函数
include __DIR__ . '/xss/XssFilter.php';
//过滤数据
$_GET    && XssFilter($_GET);
$_POST   && XssFilter($_POST);
$_COOKIE && XssFilter($_COOKIE);



// Run the application!
Application::init($appConfig)->run();
