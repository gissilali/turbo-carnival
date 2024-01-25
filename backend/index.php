<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


require __DIR__ . "/vendor/autoload.php";


use App\Database\TextDatabase;
use App\Routing\Router;
use App\Routing\RouterNotFoundException;
use App\UsersController;


putenv("DATABASE=" . __DIR__ . "/database.txt");



$router = new Router();

$router->get("/users", function () {
    return (new UsersController(new TextDatabase()))->index();
});

$router->post("/users", function (array $requestData) {
    return (new UsersController(new TextDatabase()))->update($requestData);
});

try {
    echo $router->resolve();
} catch (RouterNotFoundException $e) {
    echo json_encode(['message' => $e->getMessage()]);
}