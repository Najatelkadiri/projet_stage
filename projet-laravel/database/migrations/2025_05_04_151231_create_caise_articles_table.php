<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('caise_articles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('caisse_id');
            $table->integer('quantite');
            $table->decimal('prix_unitaire', 10, 2);
            $table->decimal('total', 10, 2);
            $table->timestamps();

            $table->foreign('caisse_id')->references('id')->on('caisses')->onDelete('cascade');
            $table->unique(['caisse_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('caise_articles');
    }
};
