<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\caise_article; // تأكد من أن الاسم الصحيح للنموذج هو CaiseArticle
use Illuminate\Http\Request;

class Caise_ArticleController extends Controller
{
    // إرجاع جميع السجلات مع البيانات المرتبطة
    public function index()
    {
        return response()->json(caise_article::with(['caisse'])->get());
    }

    // تخزين مقال في caise_article
    public function store(Request $request)
    {
        // التحقق من صحة البيانات المدخلة بدون article_id
        $validated = $request->validate([
            'caisse_id' => 'required|exists:caisses,id',
            'quantite' => 'required|numeric',
            'prix_unitaire' => 'required|numeric',
            'total' => 'required|numeric',
        ]);

        $caiseArticle = caise_article::create($validated);
        return response()->json($caiseArticle, 201);
    }

    // إظهار تفاصيل مقال معين
    public function show($id)
    {
        $caiseArticle = caise_article::with(['caisse'])->find($id);
        if (!$caiseArticle) {
            return response()->json(['message' => 'Item not found'], 404);
        }
        return response()->json($caiseArticle);
    }

    // تحديث مقال معين
    public function update(Request $request, $id)
    {
        $caiseArticle = Caise_Article::findOrFail($id);

        // التحقق من صحة البيانات بدون article_id
        $validated = $request->validate([
            'caisse_id' => 'required|exists:caisse,id',
            'quantite' => 'required|numeric',
            'prix_unitaire' => 'required|numeric',
            'total' => 'required|numeric',
        ]);

        $caiseArticle->update($validated);
        return response()->json($caiseArticle);
    }

    // حذف مقال معين
    public function destroy($id)
    {
        $caiseArticle = caise_article::find($id);

        if (!$caiseArticle) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        $caiseArticle->delete();
        return response()->json(null, 204);
    }
}
