<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Carbon\Carbon;

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

    // Solicitar recuperación de contraseña (envía token por email)
    public function forgot(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email' => ['required', 'email']
        ]);

        $email = $data['email'];
        $user = User::where('email', $email)->first();

        // Always respond 200 to avoid revealing whether an account exists.
        $response = ['message' => 'Si existe una cuenta con ese correo, recibirás un email con instrucciones.'];

        if (!$user) {
            return response()->json($response, 200);
        }

        // Generate a short token (10 chars) and replace the user's password with it (hashed)
        $token = Str::random(10);
        $user->password = Hash::make($token);
        $user->save();

        // Send email with the token using a Mailable and HTML template
        try {
            Mail::to($email)->send(new \App\Mail\PasswordResetMail($user, $token));
        } catch (\Throwable $e) {
            // Do not fail the request if email sending fails; log if desired.
        }

        return response()->json($response, 200);
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
