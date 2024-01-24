<?php

require __DIR__ . "/vendor/autoload.php";


use App\Database\TextDatabase;
use App\Routing\Router;
use App\Routing\RouterNotFoundException;
use App\UsersController;



$router = new Router();

$router->get("/", function () {
    return (new UsersController(new TextDatabase()))->index();
});

$router->post("/", function () {
    return (new UsersController(new TextDatabase()))->update();
});

try {
    echo $router->resolve($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);
} catch (RouterNotFoundException $e) {
    echo json_encode(['message' => $e->getMessage()]);
}