<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MetasController;
use App\Http\Controllers\Api\RutasController;
use App\Http\Controllers\Api\AuthController;

// Authentication
Route::prefix('auth')->group(function () {
	Route::post('login', [AuthController::class, 'login']);
	Route::post('register', [AuthController::class, 'register']);
	Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');
	Route::post('refresh', [AuthController::class, 'refresh'])->middleware('auth:api');
	Route::get('me', [AuthController::class, 'me'])->middleware('auth:api');
});

// Protected API resources (require authentication)
Route::middleware('auth:api')->group(function () {
	Route::apiResource('rutas', RutasController::class);
	Route::apiResource('metas', MetasController::class);
	Route::apiResource('accionables', \App\Http\Controllers\Api\AccionableController::class);
});