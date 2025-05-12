<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Client;

class ClientSeeder extends Seeder
{
    public function run()
    {
        // إنشاء 10 عملاء باستخدام الـ factory
        Client::factory()->count(10)->create();
    }
}
