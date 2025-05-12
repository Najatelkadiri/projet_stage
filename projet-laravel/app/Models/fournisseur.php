<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fournisseur extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'email', 'telephone', 'adresse'];

    public function devis()
    {
        return $this->hasMany(Devi::class);
    }

    public function bonCommandes()
    {
        return $this->hasMany(Bon_Commande::class);
    }
}
