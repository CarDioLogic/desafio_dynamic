<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Dev;

class DevSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $techStack = [
            'PHP', 'Laravel', 'Vue', 'React',
            'Node.js', 'MySQL', 'Docker', 'Redis'
        ];

        Dev::factory()
            ->count(20)
            ->create()
            ->each(function ($dev) use ($techStack) {

                $randomStacks = collect($techStack)
                    ->random(rand(1, 4));

                foreach ($randomStacks as $tech) {
                    $dev->stacks()->create([
                        'name' => $tech
                    ]);
                }
            });
    }
}
