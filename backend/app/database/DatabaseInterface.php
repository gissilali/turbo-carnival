<?php

namespace App\Database;

interface DatabaseInterface
{
    public function fetchAll(): array;

    public function createOrUpdate(array $data): array;
}