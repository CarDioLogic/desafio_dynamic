<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dev_stacks', function (Blueprint $table) {
            $table->id();
            $table->uuid('dev_id');
            $table->string('name', 32);
            $table->timestamps();
            $table->foreign('dev_id')
                ->references('id')
                ->on('devs')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dev_stacks');
    }
};
