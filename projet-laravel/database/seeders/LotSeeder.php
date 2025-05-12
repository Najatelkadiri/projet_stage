<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Lot;

class LotSeeder extends Seeder
{
    public function run()
    {
        // Crée 10 lots avec la factory
        Lot::factory()->count(10)->create();
    }
}
