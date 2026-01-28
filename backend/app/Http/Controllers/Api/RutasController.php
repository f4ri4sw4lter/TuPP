<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RutaResource;
use App\Models\Ruta;
use Illuminate\Support\Facades\Auth;

class RutasController extends Controller
{
    public function index()
    {
        // 1. Traemos todas las rutas del sistema
        $rutas = Ruta::orderBy('id')
            ->get();

        // 3. Transformamos la respuesta al formato exacto
        return RutaResource::collection($rutas);
    }
}