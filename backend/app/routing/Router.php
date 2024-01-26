<?php

namespace App\Routing;

class Router
{
    private array $routes;

    private function register(string $requestMethod, string $route, callable $routeHandler)
    {
        $this->routes[$requestMethod][$route] = $routeHandler;
    }


    public function get(string $route, callable $routeHandler): self
    {
        $this->register('GET', $route, $routeHandler);
        return $this;
    }

    public function post(string $route, callable $routeHandler): self
    {
        $this->register('POST', $route, $routeHandler);
        return $this;
    }

    public function resolve()
    {
        $requestUri = $_SERVER['REQUEST_URI'];
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        [$route] = explode("?", $requestUri);
        $handler = $this->routes[$requestMethod][$route] ?? null;
        $data = [];


        if ($requestMethod == "POST") {
            $rawData = file_get_contents("php://input");

            $data = array_merge(
                $_POST,
                json_decode($rawData, true)
            );
        }

        if ($requestMethod == "GET") {
            $data = $_GET;
        }

        if ($handler && is_callable($handler)) {
            return match ($requestMethod) {
                "GET" => call_user_func($handler, $data),
                "POST" => call_user_func(
                    $handler,
                    $data,
                )
            };
        } else {
            throw new RouterNotFoundException("Route '$requestMethod $requestUri' not found");
        }
    }

}