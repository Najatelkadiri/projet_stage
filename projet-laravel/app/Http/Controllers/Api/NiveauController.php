<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Niveau;
use Illuminate\Http\Request;

class NiveauController extends Controller
{
    public function index()
    {
        return response()->json(Niveau::with(['lot'])->get());
    }

    public function store(Request $request)
    {
        $niveau = Niveau::create($request->all());
        return response()->json($niveau, 201);
    }

    public function show($id)
    {
        return response()->json(Niveau::with(['lot'])->find($id));
    }

    public function update(Request $request, $id)
    {
        $niveau = Niveau::findOrFail($id);
        $niveau->update($request->all());
        return response()->json($niveau);
    }

    public function destroy($id)
    {
        Niveau::destroy($id);
        return response()->json(null, 204);
    }
}
