<?php

namespace Database\Factories;

use App\Models\Niveau;
use App\Models\Lot;
use Illuminate\Database\Eloquent\Factories\Factory;

class NiveauFactory extends Factory
{
    protected $model = Niveau::class;

    public function definition()
    {
        return [
            'nom' => $this->faker->word(),
            'description' => $this->faker->sentence(),
            'lot_id' => Lot::inRandomOrder()->first()?->id ?? Lot::factory(), // خاص يكون عندك lot
        ];
    }
}
