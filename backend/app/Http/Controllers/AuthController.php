<?php

namespace App\Http\Controllers;

use App\Domains\User\Actions\RegisterUserAction;
use App\Domains\User\Repositories\UserRepositoryInterface;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $userRepository;
    protected $registerUserAction;

    public function __construct(UserRepositoryInterface $userRepository, RegisterUserAction $registerUserAction)
    {
        $this->userRepository = $userRepository;
        $this->registerUserAction = $registerUserAction;
    }

    public function register(Request $request)
    {

        $data = $request->all();

        try {
            $user = $this->registerUserAction->execute($data);

            return response()->json($user, 201);
        } catch (\InvalidArgumentException $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }
}
