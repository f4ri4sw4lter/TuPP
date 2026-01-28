<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Accionable;
use App\Models\Meta;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AccionableController extends Controller
{
    // Listar accionables del usuario (opcionalmente filtrar por meta_id)
    public function index(Request $request): JsonResponse
    {
        $userId = Auth::id();

        $query = Accionable::query()->whereHas('meta', function ($q) use ($userId) {
            $q->where('user_id', $userId);
        });

        if ($request->filled('meta_id')) {
            $query->where('meta_id', $request->input('meta_id'));
        }

        $accionables = $query->get();

        return response()->json(['data' => $accionables], 200);
    }

    // Crear un accionable vinculado a una meta del usuario
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'texto' => ['required', 'string', 'max:1000'],
            'meta_id' => ['required', 'integer', 'exists:metas,id'],
        ]);

        $meta = Meta::findOrFail($data['meta_id']);
        if ($meta->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized to add accionable to this meta'], 403);
        }

        $accionable = Accionable::create([
            'texto' => $data['texto'],
            'meta_id' => $data['meta_id'],
        ]);

        return response()->json($accionable, 201);
    }

    public function show(Accionable $accionable): JsonResponse
    {
        // asegurar que el accionable pertenece al usuario
        if ($accionable->meta->user_id !== Auth::id()) {
            return response()->json(['message' => 'Not found'], 404);
        }

        return response()->json($accionable);
    }

    public function update(Request $request, Accionable $accionable): JsonResponse
    {
        if ($accionable->meta->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $data = $request->validate([
            'texto' => ['sometimes', 'string', 'max:1000'],
            'hecho' => ['sometimes', 'boolean'],
        ]);

        $accionable->update($data);

        return response()->json($accionable);
    }

    public function destroy(Accionable $accionable): JsonResponse
    {
        if ($accionable->meta->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $accionable->delete();

        return response()->json(['message' => 'Deleted'], 200);
    }
}