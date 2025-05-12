<?php

namespace Database\Factories;

use App\Models\Vente;
use App\Models\Niveau;
use Illuminate\Database\Eloquent\Factories\Factory;

class VenteFactory extends Factory
{
    protected $model = Vente::class;

    public function definition()
    {
        return [
            'niveau_id' => Niveau::inRandomOrder()->first()->id,  // ربط مع موديل Niveau
            'n_tf' => $this->faker->word(),
            'acheteur' => $this->faker->name(),
            'date' => $this->faker->date(),
            'situation' => $this->faker->word(),
            'superficie' => $this->faker->numberBetween(100, 500),
            'pu_d' => $this->faker->randomFloat(2, 1000, 3000),
            'pu_b' => $this->faker->randomFloat(2, 1000, 3000),
            'pu_vente' => $this->faker->randomFloat(2, 1500, 4000),
            'prix_total_b' => $this->faker->randomFloat(2, 50000, 200000),
            'prix_total_d' => $this->faker->randomFloat(2, 50000, 200000),
            'prix_total' => $this->faker->randomFloat(2, 50000, 250000),
            'total_apr' => $this->faker->randomFloat(2, 100000, 300000),
            'statut' => $this->faker->word(),
        ];
    }
}
