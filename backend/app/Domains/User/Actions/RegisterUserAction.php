<?php

namespace App\Domains\User\Actions;

use App\Domains\User\Models\User;
use App\Domains\User\Repositories\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterUserAction
{
    protected $userRepository;

    public function __construct(UserRepositoryInterface $userRepository,)
    {
        $this->userRepository = $userRepository;
    }
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

        $user = $this->userRepository->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        return $user;
    }
}
