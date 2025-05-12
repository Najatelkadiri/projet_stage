<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vente;

class VenteSeeder extends Seeder
{
    public function run()
    {
        Vente::factory()->count(10)->create();  // Génère 10 ventes avec des données aléatoires
    }
}
