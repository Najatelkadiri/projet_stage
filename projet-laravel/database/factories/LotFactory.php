<?php

namespace Database\Factories;

use App\Models\Lot;
use App\Models\Zone; // Assurez-vous d'importer le modèle Zone
use Illuminate\Database\Eloquent\Factories\Factory;

class LotFactory extends Factory
{
    protected $model = Lot::class;

    public function definition()
    {
        return [
            'zone_id' => Zone::factory(), // Associe un zone_id aléatoire en utilisant la factory Zone
            'nom' => $this->faker->word, // Le nom du lot
            'description' => $this->faker->sentence, // La description du lot
            'created_at' => now(), 
            'updated_at' => now(),
        ];
    }
}
