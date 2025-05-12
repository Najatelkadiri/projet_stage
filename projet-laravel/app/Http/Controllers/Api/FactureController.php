<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Facture;
use Illuminate\Http\Request;

class FactureController extends Controller
{
    public function index()
    {
        return response()->json(Facture::with(['bonLivraison', 'paiements'])->get());
    }

    public function store(Request $request)
    {
        $facture = Facture::create($request->all());
        return response()->json($facture, 201);
    }

    public function show($id)
    {
        return response()->json(Facture::with(['bonLivraison', 'paiements'])->find($id));
    }

    public function update(Request $request, $id)
    {
        $facture = Facture::findOrFail($id);
        $facture->update($request->all());
        return response()->json($facture);
    }

    public function destroy($id)
    {
        Facture::destroy($id);
        return response()->json(null, 204);
    }
}
