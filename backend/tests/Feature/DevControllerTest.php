<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Dev;

class DevControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_dev()
    {
        $payload = [
            'nickname' => 'john',
            'name' => 'John',
            'birth_date' => '1993-01-01',
            'stack' => ['PHP', 'Laravel']
        ];

        $response = $this->postJson('/api/devs', $payload);

        $response->assertStatus(201)
                ->assertJsonStructure([
                    'id',
                    'nickname',
                    'name',
                    'birth_date',
                    'stack'
                ]);

        $this->assertDatabaseHas('devs', [
            'nickname' => 'john'
        ]);
    }

    public function test_search_returns_matching_devs()
    {
        Dev::factory()->create([
            'name' => 'John Node',
            'nickname' => 'john'
        ]);

        Dev::factory()->create([
            'name' => 'Maria PHP',
            'nickname' => 'maria'
        ]);

        $response = $this->getJson('/api/devs?terms=node');

        $response->assertStatus(200)
                ->assertJsonCount(1);
    }

    public function test_can_show_dev()
    {
        $dev = Dev::factory()->create();

        $response = $this->getJson("/api/devs/{$dev->id}");

        $response->assertStatus(200)
                ->assertJson([
                    'id' => $dev->id
                ]);
    }
}
