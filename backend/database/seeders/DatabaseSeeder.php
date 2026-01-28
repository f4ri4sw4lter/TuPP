<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Ruta;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $rutas = [
            ['titulo' => 'corporalidad', 'color' => '#4CAF50'],
            ['titulo' => 'creatividad',  'color' => '#FF6B81'],
            ['titulo' => 'afectividad',  'color' => '#FF7043'],
            ['titulo' => 'espiritualidad',  'color' => '#42A5F5'],
            ['titulo' => 'mentalidad',  'color' => '#7E57C2'],
            ['titulo' => 'socialidad',  'color' => '#FFD54F'],
        ];

        foreach ($rutas as $ruta) {
            Ruta::factory()->create([
                'titulo' => $ruta['titulo'],
                'color' => $ruta['color'],
            ]);
        }
    }
}
