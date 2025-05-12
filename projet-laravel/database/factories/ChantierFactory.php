<?php

namespace Database\Factories;

use App\Models\Chantier;
use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

class ChantierFactory extends Factory
{
    public function definition()
    {
        // محاولة جلب Client، وإذا لم يوجد، استخدم 1 كـ client_id
        $clientId = Client::inRandomOrder()->first() ? Client::inRandomOrder()->first()->id : 1;

        return [
            'client_id' => $clientId, // استخدام client_id موجود أو 1 في حال عدم وجود بيانات
            'nom' => $this->faker->word(),
            'description' => $this->faker->sentence(),
        ];
    }
}
