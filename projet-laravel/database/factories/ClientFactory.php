<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClientFactory extends Factory
{
    protected $model = Client::class;

    public function definition()
    {
        return [
            'nom' => $this->faker->lastName(),  // اسم عائلة عشوائي
            'prenom' => $this->faker->firstName(),  // اسم أول عشوائي
            'email' => $this->faker->unique()->safeEmail(),  // بريد إلكتروني عشوائي
            'telephone' => $this->faker->phoneNumber(),  // رقم هاتف عشوائي
            'adresse' => $this->faker->address(),  // عنوان عشوائي
        ];
    }
}
