<?php

namespace App\Http\Controllers;

use App\Domains\User\Actions\LoginUserAction;
use App\Domains\User\Actions\RegisterUserAction;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $registerUserAction;
    protected $loginUserAction;

    public function __construct(RegisterUserAction $registerUserAction, LoginUserAction $loginUserAction)
    {
        $this->registerUserAction = $registerUserAction;
        $this->loginUserAction = $loginUserAction;
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


    public function login(Request $request)
    {
        $data = $request->all();

        try {
            $token = $this->loginUserAction->execute($data);

            if ($token) {
                return $this->respondWithToken($token);
            }

            return response()->json($token, 201);
        } catch (\InvalidArgumentException $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
        ]);
    }
}
