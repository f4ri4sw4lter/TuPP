<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RutaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'titulo' => $this->titulo, // "corporalidad", etc.
            'color' => $this->color,   // "#4CAF50" (debe estar en tu tabla Rutas)
            // Si el usuario no tiene metas en esta ruta, devolvemos array vacío []
            'metas' => MetaResource::collection($this->whenLoaded('metas')),
        ];
    }
}
