<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('ventes', function (Blueprint $table) {
            $table->id();

            // العلاقة مع niveaux
            $table->foreignId('niveau_id')->constrained()->onDelete('cascade');

            // باقي الأعمدة
            $table->string('n_tf')->nullable();
            $table->string('acheteur')->nullable();
            $table->date('date')->nullable();
            $table->string('situation')->nullable();
            $table->string('superficie')->nullable();

            $table->decimal('pu_d', 10, 2)->nullable();
            $table->decimal('pu_b', 10, 2)->nullable();
            $table->decimal('pu_vente', 10, 2)->nullable();

            $table->decimal('prix_total_b', 10, 2)->nullable();
            $table->decimal('prix_total_d', 10, 2)->nullable();
            $table->decimal('prix_total', 10, 2)->nullable();
            $table->decimal('total_apr', 10, 2)->nullable();

            $table->string('statut')->nullable();

            $table->timestamps(); // created_at & updated_at
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ventes');
    }
};
