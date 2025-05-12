<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Niveau extends Model
{
    use HasFactory;

    protected $fillable = ['lot_id', 'nom', 'description'];

    /**
     * العلاقة بين Niveau و Vente
     */
    public function ventes()
    {
        return $this->hasMany(Vente::class);
    }
   
    public function lot()
    {
        return $this->belongsTo(Lot::class);
    }
}
