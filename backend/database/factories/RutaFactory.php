<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Ruta;

class RutaFactory extends Factory
{
    protected $model = Ruta::class;

    public function definition(): array
    {
        return [
            'titulo' => $this->faker->unique()->word(),
            'color'  => $this->faker->hexColor(),
        ];
    }
}