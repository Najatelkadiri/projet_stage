<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Caisse;
use Illuminate\Http\Request;

class CaisseController extends Controller
{
    // عرض جميع السجلات
    public function index()
    {
        return response()->json(Caisse::all());
    }

    // إضافة سجل جديد
    public function store(Request $request)
    {
        $request->validate([
            'total' => 'required|numeric',
        ]);
    
        $caisse = Caisse::create([
            'total' => $request->total,
        ]);
    
        return response()->json([
            'message' => 'Caisse enregistrée avec succès',
            'caisse' => $caisse
        ], 201);
    }

    // عرض سجل معين
    public function show($id)
    {
        $caisse = Caisse::findOrFail($id);
        return response()->json($caisse);
    }

    // تعديل سجل معين
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'total' => 'required|numeric',
        ]);

        $caisse = Caisse::findOrFail($id);
        $caisse->update([
            'total' => $validated['total']
        ]);

        return response()->json(['message' => 'تم التعديل بنجاح', 'caisse' => $caisse]);
    }
    // حذف سجل معين
    public function destroy($id)
    {
        $caisse = Caisse::findOrFail($id);
        $caisse->delete();

        return response()->json(['message' => 'تم الحذف بنجاح'], 204);
    }
    
}
