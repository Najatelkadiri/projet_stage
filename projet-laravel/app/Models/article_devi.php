<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article_Devi extends Model
{
    use HasFactory;

    protected $fillable = ['devis_id', 'article_id', 'quantite'];

    public function devis()
    {
        return $this->belongsTo(Devi::class);
    }

    public function article()
    {
        return $this->belongsTo(Article::class);
    }
}
