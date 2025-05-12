<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\bon_commande;
use Illuminate\Http\Request;

class Bon_CommandeController extends Controller
{
    public function index()
    {
        return response()->json(bon_commande::with(['devis', 'fournisseur'])->get());
    }

    public function store(Request $request)
    {
        $bonCommande = bon_commande::create($request->all());
        return response()->json($bonCommande, 201);
    }

    public function show($id)
    {
        return response()->json(bon_commande::with(['devis', 'fournisseur'])->find($id));
    }

    public function update(Request $request, $id)
    {
        $bonCommande = bon_commande::findOrFail($id);
        $bonCommande->update($request->all());
        return response()->json($bonCommande);
    }

    public function destroy($id)
    {
        bon_commande::destroy($id);
        return response()->json(null, 204);
    }
}
