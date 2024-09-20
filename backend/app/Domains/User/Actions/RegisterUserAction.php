<?php

namespace App\Domains\User\Actions;

use App\Domains\User\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterUserAction
{
    /**
     * Executa a ação de registro do usuário.
     *
     * @param array $data
     * @return User
     */
    public function execute(array $data): User
    {
        $validator = Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            throw new \InvalidArgumentException('Invalid data provided.');
        }

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']), // Criptografa a senha
        ]);

        return $user;
    }
}
