<?php

namespace App;

use App\Database\DatabaseInterface;

class UsersController
{

    public function __construct(private readonly DatabaseInterface $database)
    {

    }
    public function index()
    {

        return json_encode($this->database->fetchAll(), JSON_PRETTY_PRINT);
    }

    public function update()
    {

        return json_encode($this->database->update());
    }
}