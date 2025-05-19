<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\FournisseurController;
use App\Http\Controllers\Api\ChantierController;
use App\Http\Controllers\Api\ZoneController;
use App\Http\Controllers\Api\LotController;
use App\Http\Controllers\Api\NiveauController;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\DeviController;
use App\Http\Controllers\Api\Article_DeviController;
use App\Http\Controllers\Api\Bon_CommandeController;
use App\Http\Controllers\Api\Bon_LivraisonController;
use App\Http\Controllers\Api\FactureController;
use App\Http\Controllers\Api\PaiementController;
use App\Http\Controllers\Api\CaisseController;
use App\Http\Controllers\Api\StockController;
use App\Http\Controllers\Api\Article_StockController;
use App\Http\Controllers\Api\Caise_ArticleController;
use App\Http\Controllers\Api\VenteController;

use App\Http\Controllers\AuthController;

Route::apiResource('clients', ClientController::class);
Route::apiResource('fournisseurs', FournisseurController::class);
Route::apiResource('chantiers', ChantierController::class);
Route::apiResource('zones', ZoneController::class);
Route::apiResource('lots', LotController::class);
Route::apiResource('niveaux', NiveauController::class);
Route::apiResource('articles', ArticleController::class);
Route::apiResource('devis', DeviController::class);
Route::apiResource('article_devis', Article_DeviController::class);
Route::apiResource('bon_commandes', Bon_CommandeController::class);
Route::apiResource('bon_livraisons', Bon_LivraisonController::class);
Route::apiResource('factures', FactureController::class);
Route::apiResource('paiements', PaiementController::class);
Route::apiResource('stocks', StockController::class);
Route::apiResource('article_stock', Article_StockController::class);
Route::apiResource('caise_articles', Caise_ArticleController::class);
Route::apiResource('caisses', CaisseController::class);

Route::get('/test', function () {
    return response()->json(['message' => 'API working']);
});
Route::post('/caise_articles', [Caise_ArticleController::class, 'store']);


Route::apiResource('ventes', VenteController::class);

Route::post('/ventes', [VenteController::class, 'store']);

Route::post('/paiements', [PaiementController::class, 'store']);
Route::put('/paiements/{id}', [PaiementController::class, 'update']);
Route::delete('/paiements/{id}', [PaiementController::class, 'destroy']);




Route::get('/ventes', [VenteController::class, 'index']); // جميع المبيعات
Route::get('/ventes/{id}', [VenteController::class, 'show']); // تفاصيل واحدة
Route::post('/ventes', [VenteController::class, 'store']); // إنشاء vente
Route::put('/ventes/{id}', [VenteController::class, 'update']); // تعديل vente
Route::delete('/ventes/{id}', [VenteController::class, 'destroy']); // حذف vente



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::resource('/chantier',ChantierController::class);
Route::resource('/client',ClientController::class);