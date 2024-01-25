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

        return json_encode($this->database->fetchAll());
    }

    public function update(array $data)
    {

        return json_encode($this->database->createOrUpdate([
            "name" => $data['name'],
            "email" => $data['email'],
            "ip_address" => Utils::getUserIP(),
            "user_agent" => Utils::getUserAgent(),
            "entrance_time" => date('Y-m-d H:i:s'),
            "last_update_time" => date('Y-m-d H:i:s')
        ]));
    }
}