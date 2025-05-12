<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chantier extends Model
{
    use HasFactory;

    protected $fillable = ['client_id', 'nom', 'description'];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function zones()
    {
        return $this->hasMany(Zone::class);
    }

    public function devis()
    {
        return $this->hasMany(Devi::class);
    }

    public function paiements()
    {
        return $this->hasMany(Paiement::class);
    }

    public function stocks()
    {
        return $this->hasMany(Stock::class);
    }
}
