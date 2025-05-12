<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Zone extends Model
{
    use HasFactory;

    protected $fillable = ['chantier_id', 'nom', 'description'];

    public function chantier()
    {
        return $this->belongsTo(Chantier::class);
    }

    public function lots()
    {
        return $this->hasMany(Lot::class);
    }
}
