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
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();

            $table->text('quote_ar');
            $table->text('quote_en');

            $table->string('author_ar');
            $table->string('author_en');

            $table->string('logo')->nullable();   // شعار العميل
            $table->string('image')->nullable();  // صورة العميل أو المشروع

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
