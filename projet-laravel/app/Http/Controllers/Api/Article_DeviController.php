<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\article_devi;
use Illuminate\Http\Request;

class Article_DeviController extends Controller
{
    public function index()
    {
        // ترجع جميع العناصر مع العلاقات
        return response()->json(article_devi::with(['devis', 'article'])->get());
    }

    public function store(Request $request)
    {
        // التحقق من البيانات
        $validated = $request->validate([
            'devis_id' => 'required|exists:devis,id',
            'article_id' => 'required|exists:articles,id',
            'quantite' => 'required|numeric|min:1',
        ]);

        // إنشاء العنصر
        $articleDevi = article_devi::create($validated);
        return response()->json($articleDevi, 201);
    }

    public function show($id)
    {
        // عرض عنصر واحد مع علاقاته
        $articleDevi = article_devi::with(['devis', 'article'])->findOrFail($id);
        return response()->json($articleDevi);
    }

    public function update(Request $request, $id)
    {
        $articleDevi = article_devi::findOrFail($id);

        // تحقق من القيم المرسلة (غير إلزامية)
        $validated = $request->validate([
            'devis_id' => 'sometimes|exists:devis,id',
            'article_id' => 'sometimes|exists:articles,id',
            'quantite' => 'sometimes|numeric|min:1',
        ]);

        // تحديث
        $articleDevi->update($validated);
        return response()->json($articleDevi);
    }

    public function destroy($id)
    {
        article_devi::destroy($id);
        return response()->json(null, 204);
    }
}
