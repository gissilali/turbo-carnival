<?php

require __DIR__ . "/vendor/autoload.php";


use App\Router;
use App\UsersController;



$router = new Router();

$router->register("/", function () {
    return (new UsersController())->index();
});

echo $router->resolve($_SERVER['REQUEST_URI']);