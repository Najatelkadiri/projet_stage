<?php

namespace App\Http\Controllers;

use App\Models\Paiement;
use Illuminate\Http\Request;

class PaiementController extends Controller
{
    public function store(Request $request)
    {
        // Validation des données envoyées
        $data = $request->validate([
            'chantier_id' => 'required|exists:chantiers,id',
            'type' => 'required|string',
            'avance' => 'required|numeric',
            'status' => 'required|string',
        ]);

        // Création du paiement
        $payment = Paiement::create($data);

        return response()->json($payment, 201);
    }

    public function update(Request $request, $id)
    {
        // Validation des données envoyées
        $data = $request->validate([
            'chantier_id' => 'required|exists:chantiers,id',
            'type' => 'required|string',
            'avance' => 'required|numeric',
            'status' => 'required|string',
        ]);

        // Trouver et mettre à jour le paiement
        $payment = Paiement::findOrFail($id);
        $payment->update($data);

        return response()->json($payment);
    }

    public function destroy($id)
    {
        // Supprimer un paiement
        Paiement::destroy($id);

        return response()->json(['message' => 'Paiement supprimé']);
    }
}
