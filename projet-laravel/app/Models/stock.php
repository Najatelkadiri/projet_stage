<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    protected $fillable = ['chantier_id', 'article_id', 'quantite', 'date'];

    public function chantier()
    {
        return $this->belongsTo(Chantier::class);
    }

    public function article()
    {
        return $this->belongsTo(Article::class);
    }
}
