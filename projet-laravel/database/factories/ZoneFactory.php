<?php

namespace Database\Factories;

use App\Models\Zone;
use App\Models\Chantier; // Assurez-vous d'importer le modèle Chantier
use Illuminate\Database\Eloquent\Factories\Factory;

class ZoneFactory extends Factory
{
    protected $model = Zone::class;

    public function definition()
    {
        return [
            'chantier_id' => Chantier::inRandomOrder()->first()->id, // Récupère un chantier aléatoire
            'nom' => $this->faker->word(), // Génère un nom aléatoire pour la zone
            'description' => $this->faker->sentence(), // Génère une description aléatoire
        ];
    }
}
