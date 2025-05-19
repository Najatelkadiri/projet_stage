<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lot extends Model
{
    use HasFactory;

    protected $fillable = ['zone_id', 'nom', 'description'];

    public function zone()
    {
        return $this->belongsTo(Zone::class);
    }

    public function niveaux()
    {
        return $this->hasMany(Niveau::class);
    }
    
}
