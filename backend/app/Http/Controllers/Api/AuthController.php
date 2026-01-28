<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        // Login the new user and return token
        $token = auth('api')->login($user);

        return $this->respondWithToken($token, $user);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['message' => 'Credenciales invalidas'], 401);
        }

        return $this->respondWithToken($token, auth('api')->user());
    }

    public function me(): JsonResponse
    {
        return response()->json(auth('api')->user());
    }

    public function logout(): JsonResponse
    {
        auth('api')->logout();

        return response()->json(['message' => 'Sesión cerrada con éxito']);
    }

    public function refresh(): JsonResponse
    {
        $token = auth('api')->refresh();

        return $this->respondWithToken($token, auth('api')->user());
    }

    protected function respondWithToken($token, $user): JsonResponse
    {
        $ttl = auth('api')->factory()->getTTL();

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $ttl * 60,
            'user' => $user,
        ]);
    }
}
