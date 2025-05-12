<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {



        $this->call(  ClientSeeder::class);
        $this->call(  ChantierSeeder::class);
        $this->call(ZoneSeeder::class);
        $this->call(LotSeeder::class);
        $this->call( NiveauSeeder::class);
        $this->call(VenteSeeder::class);

       
          
       
      
        User::firstOrCreate(
            ['email' => 'test@example.com'], // تحقق من وجود المستخدم
            [
                'name' => 'Test User',
                'password' => bcrypt('password123'), // تأكد من إضافة كلمة مرور إذا كانت مطلوبة
            ]
        );
    }
}
