<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'description', 'prix'];

    public function stocks()
    {
        return $this->hasMany(Stock::class);
    }

    public function caiseArticles()
    {
        return $this->hasMany(Caise_Article::class);
    }

    public function articleDevis()
    {
        return $this->hasMany(Article_Devi::class);
    }
}
