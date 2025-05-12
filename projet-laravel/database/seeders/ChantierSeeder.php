<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Chantier;

class ChantierSeeder extends Seeder
{
    public function run()
    {
        // Utilisation de la factory pour générer 10 chantiers
        Chantier::factory()->count(10)->create();
    }
}
