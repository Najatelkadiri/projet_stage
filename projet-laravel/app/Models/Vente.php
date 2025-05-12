<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Vente extends Model
{
    use HasFactory;
    

    /**
     * الحقول اللي مسموح تعبئتها دفعة واحدة
     */
    protected $fillable = [
        'niveau_id',
        'zone_id',
        'lot_id',
        'chantier_id',
        'n_tf',
        'acheteur',
        'date',
        'situation',
        'superficie',
        'pu_d',
        'pu_b',
        'pu_vente',
        'prix_total_b',
        'prix_total_d',
        'prix_total',
        'total_apr',
        'statut',
    ];

    /**
     * العلاقة بمنطقة (Zone)
     */
    public function zone()
    {
        return $this->belongsTo(Zone::class);
    }

    /**
     * العلاقة بالقطعة (Lot)
     */
    public function lot()
    {
        return $this->belongsTo(Lot::class);
    }

    /**
     * العلاقة بالموقع (Chantier)
     */
    public function chantier()
    {
        return $this->belongsTo(Chantier::class);
    }

    /**
     * العلاقة بالمستوى (Niveau)
     */
    public function niveau()
    {
        return $this->belongsTo(Niveau::class);
    }
}
