<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class caise_article extends Model
{
    use HasFactory;
    protected $table = 'caise_articles';

    protected $fillable = [
        'caisse_id',
        'quantite',
        'prix_unitaire',
        'total',
    ];

   
 public function caisse()
    {
        return $this->belongsTo(Caisse::class, 'caisse_id');
    }
    
    
}



   

   

