<?php

namespace App;

class Router
{
    private array $routes;

    public function register(string $route, callable $routeHandler)
    {
        $this->routes[$route] = $routeHandler;
    }


    public function resolve(string $requestUri)
    {
        [$route] = explode("?", $requestUri);
        $handler = $this->routes[$route] ?? null;

        if ($handler && is_callable($handler)) {
            return call_user_func($handler, $route);
        } else {
            throw new \Exception("Route not found");
        }
    }

}