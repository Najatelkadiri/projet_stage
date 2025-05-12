<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    use HasFactory;

    protected $fillable = ['chantier_id', 'type', 'avance', 'status'];

    public function chantier()
    {
        return $this->belongsTo(Chantier::class);
    }
}
