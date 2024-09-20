<?php

namespace App\Domains\User\Repositories;

use App\Domains\User\Models\User;

interface UserRepositoryInterface
{
    public function create(array $data): User;

    public function findById(int $id): ?User;

    public function update(int $id, array $data): ?User;

    public function delete(int $id): bool;

    public function findByEmail(string $email): ?User;
}
