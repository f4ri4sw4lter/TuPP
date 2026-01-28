<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMetaRequest;
use App\Models\Meta;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Throwable;

class MetasController extends Controller
{

    public function index(): JsonResponse
    {
        // devolver solo las metas del usuario autenticado
        $userId = Auth::id();

        $metas = Meta::with(['ruta', 'accionables'])
            ->when($userId, function ($q) use ($userId) {
                return $q->where('user_id', $userId);
            })
            ->get();

        return response()->json($metas);
    }

    public function store(StoreMetaRequest $request): JsonResponse
    {
        $data = $request->validated();

        // usar el usuario autenticado
        $data['user_id'] = Auth::id();

        $meta = Meta::create($data);

        return response()->json($meta, 201);
    }

    public function show(Meta $meta): JsonResponse
    {
        // asegurar que la meta pertenece al usuario autenticado
        if ($meta->user_id !== Auth::id()) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $meta->load(['ruta', 'accionables']);

        return response()->json($meta);
    }

    public function update(Request $request, Meta $meta): JsonResponse
    {
        // comprobar propietario
        if ($meta->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $data = $request->validate([
            'titulo' => ['sometimes', 'string', 'max:255'],
            'ruta_id' => ['sometimes', 'integer', 'exists:rutas,id'],
        ]);

        $meta->update($data);

        $meta->load(['ruta', 'accionables']);

        return response()->json($meta);
    }

    public function destroy(Meta $meta): JsonResponse
    {
        if ($meta->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $meta->delete();

        return response()->json(['message' => 'Deleted'], 200);
    }
}