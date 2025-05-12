<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Devi extends Model
{
    use HasFactory;

    protected $fillable = ['fournisseur_id', 'chantier_id', 'montant'];

    public function fournisseur()
    {
        return $this->belongsTo(Fournisseur::class);
    }

    public function chantier()
    {
        return $this->belongsTo(Chantier::class);
    }

    public function bonCommandes()
    {
        return $this->hasMany(Bon_Commande::class);
    }
}
