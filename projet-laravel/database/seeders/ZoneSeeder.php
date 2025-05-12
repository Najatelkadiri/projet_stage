<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Zone;

class ZoneSeeder extends Seeder
{
    public function run()
    {
        // Créer 10 zones avec la factory
        Zone::factory()->count(10)->create();
    }
}
