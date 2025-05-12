<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\bon_livraison;
use Illuminate\Http\Request;

class Bon_livraisonController extends Controller
{
    public function index()
    {
        return response()->json(bon_livraison::with('bonCommande')->get());
    }

    public function store(Request $request)
    {
        $bonLivraison = bon_livraison::create($request->all());
        return response()->json($bonLivraison, 201);
    }

    public function show($id)
    {
        return response()->json(bon_livraison::with('bonCommande')->find($id));
    }

    public function update(Request $request, $id)
    {
        $bonLivraison = bon_livraison::findOrFail($id);
        $bonLivraison->update($request->all());
        return response()->json($bonLivraison);
    }

    public function destroy($id)
    {
        bon_livraison::destroy($id);
        return response()->json(null, 204);
    }
}
