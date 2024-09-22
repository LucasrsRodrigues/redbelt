<?php

namespace App\Domains\User\Actions;

use App\Domains\User\Repositories\UserRepositoryInterface;
use Illuminate\Support\Facades\Auth as FacadesAuth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class LoginUserAction
{
    protected $userRepository;

    public function __construct(UserRepositoryInterface $userRepository,)
    {
        $this->userRepository = $userRepository;
    }

    public function execute(array $credentials): ?string
    {
        $validator = Validator::make($credentials, [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            throw new \InvalidArgumentException('Invalid credentials provided.');
        }

        $userExists = $this->userRepository->findByEmail($credentials['email']);

        if (!$userExists) {
            throw new \Illuminate\Validation\UnauthorizedException("Invalid credentials.");
        }


        $password_match = Hash::check($credentials['password'], $userExists['password']);

        if (!$password_match) {
            throw new \Illuminate\Validation\UnauthorizedException("Invalid credentials.");
        }

        if ($token = FacadesAuth::attempt($credentials)) {
            return $token;
        }


        return null; // Autenticação falhou
    }
}
