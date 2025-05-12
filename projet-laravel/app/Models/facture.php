<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facture extends Model
{
    use HasFactory;

    protected $fillable = ['bon_commande_id', 'montant'];

    public function bonCommande()
    {
        return $this->belongsTo(Bon_Commande::class);
    }
}
