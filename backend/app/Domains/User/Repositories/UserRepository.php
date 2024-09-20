<?php

namespace App\Domains\User\Repositories;

use App\Domains\User\Models\User;
use App\Domains\User\Repositories\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{

    public function create(array $data): User
    {
        return User::create($data);
    }

    public function findById(int $id): ?User
    {
        return User::find($id);
    }

    public function update(int $id, array $data): ?User
    {
        $user = $this->findById($id);

        if ($user) {
            $user->update($data);
            return $user;
        }

        return null;
    }

    public function delete(int $id): bool
    {
        $user = $this->findById($id);

        if ($user) {
            return $user->delete();
        }

        return false;
    }

    public function findByEmail(string $email): ?User
    {
        return User::where('email', $email)->first();
    }
}
