<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Zone;
use Illuminate\Http\Request;

class ZoneController extends Controller
{
    public function index()
    {
        return response()->json(Zone::with(['chantier', 'lots'])->get());
    }

    public function store(Request $request)
    {
        $zone = Zone::create($request->all());
        return response()->json($zone, 201);
    }

    public function show($id)
    {
        return response()->json(Zone::with(['chantier', 'lots'])->find($id));
    }

    public function update(Request $request, $id)
    {
        $zone = Zone::findOrFail($id);
        $zone->update($request->all());
        return response()->json($zone);
    }

    public function destroy($id)
    {
        Zone::destroy($id);
        return response()->json(null, 204);
    }
}
