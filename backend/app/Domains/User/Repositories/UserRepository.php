<?php

namespace App\Domains\User\Repositories;

use App\Domains\User\Models\User;
use App\Domains\User\Repositories\UserRepositoryInterface;
use Illuminate\Support\Facades\DB;

class UserRepository implements UserRepositoryInterface
{

    public function create(array $data): User
    {

        DB::insert('INSERT INTO users (name, email, email_verified_at, password, remember_token, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)', [
            $data['name'],
            $data['email'],
            null, // email_verified_at pode ser NULL
            $data['password'],
            null, // remember_token pode ser NULL
            now(), // created_at
            now()  // updated_at
        ]);

        $userId = DB::getPdo()->lastInsertId();

        $user = $this->findById($userId);

        return $user;
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
