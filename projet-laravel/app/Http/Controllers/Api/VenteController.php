<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vente;
use Illuminate\Http\Request;
use App\Models\Niveau;

class VenteController extends Controller
{
    public function index()
    {
        // جلب جميع بيانات Vente مع العلاقات المحددة (Zone, Lot, Chantier)
        return Vente::with(['zone', 'lot', 'chantier', 'niveau'])->paginate(10);
      
    }
    

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'niveau_id' => 'required|exists:niveaux,id',
                'zone_id' => 'required|exists:zones,id',
                'lot_id' => 'required|exists:lots,id',
                'chantier_id' => 'required|exists:chantiers,id',
                'n_tf' => 'required|string',
                'acheteur' => 'required|string',
                'date' => 'required|date',
                'situation' => 'nullable|string',
                'superficie' => 'required|numeric',
                'pu_d' => 'required|numeric',
                'pu_b' => 'required|numeric',
                'pu_vente' => 'required|numeric',
                'prix_total_b' => 'required|numeric',
                'prix_total_d' => 'required|numeric',
                'prix_total' => 'required|numeric',
                'total_apr' => 'required|numeric',
                'statut' => 'nullable|string',
            ]);
    
            $vente = Vente::create($validated);
            return response()->json($vente, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'errors' => $e->errors()
            ], 422);
        }
    }
    

    public function show($id)
    {
        // جلب Vente واحدة مع العلاقات المحددة
        return Vente::with(['zone', 'lot', 'chantier', 'niveau'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $vente = Vente::findOrFail($id);
        $vente->update($request->all());
        return $vente;
    }

    public function destroy($id)
    {
        Vente::destroy($id);
        return response()->json(['message' => 'Vente supprimée']);
    }

    
}

