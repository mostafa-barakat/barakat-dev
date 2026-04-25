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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();

            // Titles
            $table->string('title_en');
            $table->string('title_ar');

            // Category
            $table->string('category_en');
            $table->string('category_ar');

            // Image
            $table->string('image');

            // Link
            $table->string('link')->nullable();

            // Tags (JSON)
            $table->json('tags')->nullable();

            // Details
            $table->text('problem_en')->nullable();
            $table->text('problem_ar')->nullable();

            $table->text('solution_en')->nullable();
            $table->text('solution_ar')->nullable();

            $table->text('result_en')->nullable();
            $table->text('result_ar')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
