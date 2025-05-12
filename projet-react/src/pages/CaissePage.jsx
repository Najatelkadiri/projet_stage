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
    const updated = donnees.filter(item => item.id !== id);
    setDonnees(updated);
    calculateTotalSolde(updated);
    updateBackendTotal(updated);
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
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ total }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Erreur API');
        return res.json();
      })
      .then(data => {
        console.log('Solde mis à jour avec succès:', data);
      })
      .catch(err => {
        console.error('Erreur mise à jour caisse:', err);
      });
  };

  if (loading) return <p className="p-4 text-gray-500">Chargement...</p>;

  return (
    <div className="p-8 max-w-screen-xl mx-auto bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">📒 Livre de Caisse</h1>

      <div className="mb-4 flex gap-6">
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-colors"
          onClick={() => calculateTotalSolde()}
        >
          Solde: {totalSolde.toFixed(2)} DH
        </button>
        {sorties && sorties.length > 0 ? (
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
            Sortie: {sorties.reduce((acc, s) => acc + s.montant, 0)} DH
          </button>
        ) : (
          <p className="text-gray-600">Aucune sortie</p>
        )}
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-gray-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-800 transition-colors"
        >
          ➕ Ajouter
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="min-w-full text-sm text-gray-800 border-collapse w-full">
          <thead className="bg-gray-100 text-xs">
            <tr>
              <th className="px-4 py-2 border-b">Référence</th>
              <th className="px-4 py-2 border-b">Solde</th>
              <th className="px-4 py-2 border-b">Date</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donnees.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="border px-4 py-2">{item.reference}</td>
                <td className="border px-4 py-2">{item.solde} DH</td>
                <td className="border px-4 py-2">{new Date(item.date).toLocaleDateString()}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
            {showForm && (
              <tr className="bg-gray-50">
                <td className="px-4 py-2 border w-full">
                  <input
                    name="reference"
                    value={newItem.reference}
                    onChange={handleChange}
                    placeholder="Référence"
                    className="w-full p-2 border rounded-lg"
                  />
                </td>
                <td className="px-4 py-2 border w-full">
                  <input
                    name="solde"
                    type="number"
                    value={newItem.solde}
                    onChange={handleChange}
                    placeholder="Solde"
                    className="w-full p-2 border rounded-lg"
                  />
                </td>
                <td className="px-4 py-2 border w-full">
                  <input
                    name="date"
                    type="date"
                    value={newItem.date}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                  />
                </td>
                <td className="px-4 py-2 border flex gap-2 w-full">
                  {editingId ? (
                    <button
                      onClick={handleUpdate}
                      className="bg-yellow-600 text-white px-4 py-2 rounded-lg"
                    >
                      ✅ Modifier
                    </button>
                  ) : (
                    <button
                      onClick={handleAdd}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      💾 Enregistrer
                    </button>
                  )}
                  <button
                    onClick={resetForm}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg"
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
