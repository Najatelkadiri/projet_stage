<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Chantier;
use Illuminate\Http\Request;

class ChantierController extends Controller
{
    public function index()
    {
        return response()->json(Chantier::with(['client', 'zones', 'devis', 'paiements', 'stocks'])->get());
    }

    public function store(Request $request)
    {
        $chantier = Chantier::create($request->all());
        return response()->json($chantier, 201);
    }

    public function show($id)
    {
        return response()->json(Chantier::with(['client', 'zones', 'devis', 'paiements', 'stocks'])->find($id));
    }

    public function update(Request $request, $id)
    {
        $chantier = Chantier::findOrFail($id);
        $chantier->update($request->all());
        return response()->json($chantier);
    }

    public function destroy($id)
    {
        Chantier::destroy($id);
        return response()->json(null, 204);
    }
}
