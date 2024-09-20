<?php

namespace App\Domains\User\Actions;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LoginUserAction
{

    public function execute(array $credentials): ?string
    {
        $validator = Validator::make($credentials, [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            throw new \InvalidArgumentException('Invalid credentials provided.');
        }

        if (Auth::attempt($credentials)) {
            // A autenticação foi bem-sucedida, retornamos o token JWT
            $user = Auth::user();
            $token = $user->getRememberToken();

            return response()->json(['token' => $token]);
        }

        return null; // Autenticação falhou
    }
}
