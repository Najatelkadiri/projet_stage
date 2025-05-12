<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Niveau; // ✅ ضروري باش Laravel يعرف الموديل

class NiveauSeeder extends Seeder
{
    public function run()
    {
        Niveau::factory()->count(10)->create();
    }
}
