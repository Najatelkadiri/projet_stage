import React, { useEffect, useState } from 'react';

const CaissePage = ({ sorties }) => {
  const [donnees, setDonnees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({ reference: '', solde: '', date: '' });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [totalSolde, setTotalSolde] = useState(0);

  useEffect(() => {
    fetch('http://demo9780723.mockable.io/livre-de-caisse')
      .then(res => res.json())
      .then(data => {
        const loadedData = data.content.map(item => ({
          ...item,
          id: item.id || Date.now() + Math.random()
        }));
        setDonnees(loadedData);
        setLoading(false);
        calculateTotalSolde(loadedData);
      })
      .catch(err => {
        console.error('Erreur de chargement:', err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!newItem.reference || !newItem.solde || !newItem.date) return;
    const newEntry = { id: Date.now(), ...newItem };
    const updated = [...donnees, newEntry];
    setDonnees(updated);
    resetForm();
    calculateTotalSolde(updated);
    updateBackendTotal(updated);
  };

  const handleEdit = (item) => {
    setNewItem({ reference: item.reference, solde: item.solde, date: item.date });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleUpdate = () => {
    const updatedDonnees = donnees.map(item =>
      item.id === editingId ? { ...newItem, id: editingId } : item
    );
    setDonnees(updatedDonnees);
    resetForm();
    calculateTotalSolde(updatedDonnees);
    updateBackendTotal(updatedDonnees);
  };

 const handleDelete = (id) => {
  if (window.confirm("Êtes-vous sûr de vouloir supprimer cet enregistrement ?")) {
    const updated = donnees.filter(item => item.id !== id);
    setDonnees(updated);
    calculateTotalSolde(updated);
    updateBackendTotal(updated);
  }
};


  const resetForm = () => {
    setNewItem({ reference: '', solde: '', date: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const calculateTotalSolde = (data = donnees) => {
    const total = data.reduce((acc, item) => acc + parseFloat(item.solde || 0), 0);
    setTotalSolde(total);
  };

  const updateBackendTotal = (updatedDonnees) => {
    const total = updatedDonnees.reduce((acc, item) => acc + parseFloat(item.solde), 0);

    fetch('http://localhost:8000/api/caisses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ total }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Erreur API');
        return res.json();
      })
      .then(data => {
        console.log('Solde mis à jour:', data);
      })
      .catch(err => {
        console.error('Erreur mise à jour:', err);
      });
  };

  if (loading) return <p className="p-6 text-gray-600 text-center">Chargement...</p>;

  return (
   
<div className="w-full min-h-screen bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">📘 Livre de Caisse</h1>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2 text-lg font-semibold text-green-700 bg-green-100 px-4 py-2 rounded-lg">
            💰 Solde: <span>{totalSolde.toFixed(2)} DH</span>
          </div>

          {sorties?.length > 0 ? (
            <div className="flex items-center gap-2 text-lg font-semibold text-blue-700 bg-blue-100 px-4 py-2 rounded-lg">
              📤 Sortie: <span>{sorties.reduce((acc, s) => acc + s.montant, 0)} DH</span>
            </div>
          ) : (
            <div className="text-gray-500 italic">Aucune sortie</div>
          )}

          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="ml-auto bg-gray-800 hover:bg-gray-700 text-white px-5 py-2 rounded-lg font-medium transition"
          >
            ➕ Ajouter
          </button>
        </div>

       <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <table className="max-w-full w-full text-sm text-gray-700">
                <thead className="bg-gray-200 text-xs uppercase tracking-wider text-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left">Référence</th>
                    <th className="px-6 py-3 text-left">Solde</th>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {donnees.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-medium">{item.reference}</td>
                      <td className="px-6 py-4">{parseFloat(item.solde).toFixed(2)} DH</td>
                      <td className="px-6 py-4">{new Date(item.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="bg-black-400  text-white px-3 py-1 rounded-md transition"
                        >
                          ✏️ Modifier
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-black-500 text-white px-3 py-1 rounded-md transition"
                        >
                          🗑️ Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}

                  {showForm && (
                    <tr className="bg-gray-100 border-t border-gray-300">
                      <td className="px-6 py-3">
                        <input
                          name="reference"
                          value={newItem.reference}
                          onChange={handleChange}
                          placeholder="Référence"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                        />
                      </td>
                      <td className="px-6 py-3">
                        <input
                          name="solde"
                          type="number"
                          value={newItem.solde}
                          onChange={handleChange}
                          placeholder="Solde"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                        />
                      </td>
                      <td className="px-6 py-3">
                        <input
                          name="date"
                          type="date"
                          value={newItem.date}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                        />
                      </td>
                      <td className="px-6 py-3 flex gap-2">
                        {editingId ? (
                          <button
                            onClick={handleUpdate}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg"
                          >
                            ✅ Modifier
                          </button>
                        ) : (
                          <button
                            onClick={handleAdd}
                            className="bg-black-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                          >
                            💾 Enregistrer
                          </button>
                        )}
                        <button
                          onClick={resetForm}
                          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                        >
                          ❌ Annuler
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

        </div>
      </div>
   
  );
};

export default CaissePage;
