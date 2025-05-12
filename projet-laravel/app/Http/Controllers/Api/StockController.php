<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Stock;
use Illuminate\Http\Request;

class StockController extends Controller
{
    public function index()
    {
        return response()->json(Stock::with(['article', 'chantier'])->get());
    }

    public function store(Request $request)
    {
        $stock = Stock::create($request->all());
        return response()->json($stock, 201);
    }

    public function show($id)
    {
        return response()->json(Stock::with(['article', 'chantier'])->find($id));
    }

    public function update(Request $request, $id)
    {
        $stock = Stock::findOrFail($id);
        $stock->update($request->all());
        return response()->json($stock);
    }

    public function destroy($id)
    {
        Stock::destroy($id);
        return response()->json(null, 204);
    }
}
