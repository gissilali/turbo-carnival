<?php

namespace App;

class UsersController
{
    public function index()
    {
        $users = ["Gibson", "Silali"];

        return json_encode($users);
    }
}