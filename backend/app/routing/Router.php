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

    public function resolve(string $requestUri, string $requestMethod)
    {
        [$route] = explode("?", $requestUri);
        $handler = $this->routes[$requestMethod][$route] ?? null;

        if ($handler && is_callable($handler)) {
            return call_user_func($handler, $route);
        } else {
            throw new RouterNotFoundException("Route '$requestMethod $requestUri' not found");
        }
    }

}