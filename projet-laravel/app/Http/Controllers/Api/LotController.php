<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lot;
use Illuminate\Http\Request;

class LotController extends Controller
{
    public function index()
    {
        return response()->json(Lot::with(['zone', 'niveaux'])->get());
    }

    public function store(Request $request)
    {
        $lot = Lot::create($request->all());
        return response()->json($lot, 201);
    }

    public function show($id)
    {
        return response()->json(Lot::with(['zone', 'niveaux'])->find($id));
    }

    public function update(Request $request, $id)
    {
        $lot = Lot::findOrFail($id);
        $lot->update($request->all());
        return response()->json($lot);
    }

    public function destroy($id)
    {
        Lot::destroy($id);
        return response()->json(null, 204);
    }
}
