<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Fournisseur;
use Illuminate\Http\Request;

class FournisseurController extends Controller
{
    public function index()
    {
        return response()->json(Fournisseur::all());
    }

    public function store(Request $request)
    {
        $fournisseur = Fournisseur::create($request->all());
        return response()->json($fournisseur, 201);
    }

    public function show($id)
    {
        return response()->json(Fournisseur::find($id));
    }

    public function update(Request $request, $id)
    {
        $fournisseur = Fournisseur::findOrFail($id);
        $fournisseur->update($request->all());
        return response()->json($fournisseur);
    }

    public function destroy($id)
    {
        Fournisseur::destroy($id);
        return response()->json(null, 204);
    }
}
