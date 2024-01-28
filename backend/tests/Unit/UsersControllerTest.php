<?php
use App\Database\DatabaseInterface;
use App\UsersController;

describe("UsersController", function () {
    beforeEach(function () {
        $this->database = $this->createMock(DatabaseInterface::class);
        $this->usersController = new UsersController($this->database);
    });

    it('just works', function () {
        expect(true)->toBeTrue();
    });

    it('can find user by email', function () {
        $this->database->method('fetchAll')->willReturn([
            [
                'name' => 'John Doe',
                'email' => 'john@example.com',
                "ip_address" => '172.90.19.98',
                "user_agent" => 'Mozilla/5.0',
                "entrance_time" => '2024-01-28 01:19:12',
                "last_update_time" => '2024-01-28 01:19:12',
            ],
            [
                'name' => 'Jane Doe',
                'email' => 'jane@example.com',
                "ip_address" => '172.90.19.98',
                "user_agent" => 'Mozilla/5.0',
                "entrance_time" => '2024-01-28 01:19:12',
                "last_update_time" => '2024-01-28 01:19:12',
            ]
        ]);

        expect($this->usersController->findUserByEmail('john@example.com'))->toContain('"email":"john@example.com"');
    });
});