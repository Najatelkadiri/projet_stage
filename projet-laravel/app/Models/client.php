<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class client extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'prenom', 'email', 'telephone', 'adresse'];

    public function chantiers()
    {
        return $this->hasMany(Chantier::class);
    }
}
