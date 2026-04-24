<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class DevFactory extends Factory
{
    protected $model = \App\Models\Dev::class;

    public function definition(): array
    {
        return [
            'id' => (string) Str::uuid(),
            'nickname' => $this->faker->unique()->userName(),
            'name' => $this->faker->name(),
            'birth_date' => $this->faker->date('Y-m-d'),
        ];
    }
}