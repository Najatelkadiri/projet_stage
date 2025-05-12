<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bon_Commande extends Model
{
    use HasFactory;

    protected $fillable = ['devis_id', 'fournisseur_id', 'numero'];

    public function devis()
    {
        return $this->belongsTo(Devi::class);
    }

    public function fournisseur()
    {
        return $this->belongsTo(Fournisseur::class);
    }

    public function bonLivraisons()
    {
        return $this->hasMany(Bon_Livraison::class);
    }

    public function factures()
    {
        return $this->hasMany(Facture::class);
    }
}

