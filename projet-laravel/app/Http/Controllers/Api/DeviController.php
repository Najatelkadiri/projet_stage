<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Devi;
use Illuminate\Http\Request;

class DeviController extends Controller
{
    public function index()
    {
        return response()->json(Devi::with(['fournisseur', 'chantier'])->get());
    }

    public function store(Request $request)
    {
        $devi = Devi::create($request->all());
        return response()->json($devi, 201);
    }

    public function show($id)
    {
        return response()->json(Devi::with(['fournisseur', 'chantier'])->find($id));
    }

    public function update(Request $request, $id)
    {
        $devi = Devi::findOrFail($id);
        $devi->update($request->all());
        return response()->json($devi);
    }

    public function destroy($id)
    {
        Devi::destroy($id);
        return response()->json(null, 204);
    }
}
