<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article_Stock extends Model
{
    use HasFactory;

    protected $fillable = ['article_id', 'stock_id'];

    public function article()
    {
        return $this->belongsTo(Article::class);
    }

    public function stock()
    {
        return $this->belongsTo(Stock::class);
    }
}
