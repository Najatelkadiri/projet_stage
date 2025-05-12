import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const VenteAvanceDetail = () => {
  const { id } = useParams();
  const [payments, setPayments] = useState([]);
  const [venteData, setVenteData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({ id: null, type: '', avance: '', file: '', status: '' });

  useEffect(() => {
    if (id) {
      fetch(`https://demo9780723.mockable.io/vente/${id}`)
        .then(response => response.json())
        .then(data => {
          setVenteData(data);
          setPayments(data.payments || []);
        })
        .catch(err => console.error("Error fetching vente data:", err));
    }
  }, [id]);

  const handleShowModal = (payment = null) => {
    if (payment) setEditData(payment);
    else setEditData({ id: null, type: '', avance: '', file: '', status: 'payée' });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSave = () => {
    if (editData.id) {
      setPayments(payments.map(p => (p.id === editData.id ? editData : p)));
    } else {
      setPayments([...payments, { ...editData, id: Date.now() }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setPayments(payments.filter(p => p.id !== id));
  };

  const totalVente = venteData ? venteData.prixTotal : 0;
  const totalAvance = payments.reduce((sum, p) => sum + Number(p.avance), 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => handleShowModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
        >
          Ajouter Paiement
        </button>
        <div className="flex gap-4 items-center">
          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full">zone 1 - chantier 1 - niveau: null</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">Total Vente: {totalVente}</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">Total Avance: {totalAvance}</span>
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full">Reste: {totalVente - totalAvance}</span>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-6 py-3">Actions</th>
              <th className="px-6 py-3">Type Payment</th>
              <th className="px-6 py-3">Avance</th>
              <th className="px-6 py-3">File</th>
              <th className="px-6 py-3">Status Payment</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-6 py-3 flex gap-2">
                  <button
                    onClick={() => handleShowModal(p)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500 focus:outline-none"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 focus:outline-none"
                  >
                    Delete
                  </button>
                </td>
                <td className="px-6 py-3">{p.type}</td>
                <td className="px-6 py-3">{p.avance}</td>
                <td className="px-6 py-3">
                  {p.file ? (
                    <a href={URL.createObjectURL(p.file)} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                      Voir fichier
                    </a>
                  ) : (
                    '-'
                  )}
                </td>
                <td className="px-6 py-3">
                  <span className="bg-gray-800 text-white px-3 py-1 rounded-full">{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">{editData.id ? 'Modifier Paiement' : 'Nouveau Paiement'}</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Type Payment</label>
                <select
                  value={editData.type}
                  onChange={(e) => setEditData({ ...editData, type: e.target.value })}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Choisir...</option>
                  <option value="Espèce">Espèce</option>
                  <option value="Chèque">Chèque</option>
                  <option value="Virement">Virement</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Avance</label>
                <input
                  type="number"
                  value={editData.avance}
                  onChange={(e) => setEditData({ ...editData, avance: e.target.value })}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Fichier</label>
                <input
                  type="file"
                  onChange={(e) => setEditData({ ...editData, file: e.target.files[0] })}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={editData.status}
                  onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                >
                  <option value="payée">payée</option>
                  <option value="en attente">en attente</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VenteAvanceDetail;
