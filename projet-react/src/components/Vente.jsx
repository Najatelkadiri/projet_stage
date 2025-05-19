import React, { useEffect, useState } from 'react';
import { FaPen, FaTrash, FaCheck, FaTimes, FaPlus } from 'react-icons/fa';
import axios from 'axios';

const Vente = () => {
  const [ventes, setVentes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRow, setNewRow] = useState({});
  const [chantiers, setChantiers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const columns = [
    { label: 'Zone', field: 'zone_id' },
    { label: 'Lot', field: 'lot_id' },
    { label: 'Niveau', field: 'niveau_id' },
    { label: 'N° TF', field: 'n_tf' },
    { label: 'Acheteur', field: 'acheteur' },
    { label: 'Date', field: 'date' },
    { label: 'Situation', field: 'situation' },
    { label: 'Superficie', field: 'superficie' },
    { label: 'PU D', field: 'pu_d' },
    { label: 'PU B', field: 'pu_b' },
    { label: 'PU Vente', field: 'pu_vente' },
    { label: 'Prix Total B', field: 'prix_total_b' },
    { label: 'Prix Total D', field: 'prix_total_d' },
    { label: 'Prix Total', field: 'prix_total' },
    { label: 'Total APR', field: 'total_apr' },
    { label: 'Statut', field: 'statut' },
  ];

  const calculateTotals = (row) => {
    const superficie = +row.superficie || 0;
    const pu_b = +row.pu_b || 0;
    const pu_d = +row.pu_d || 0;
    const pu_vente = +row.pu_vente || 0;
    const prix_total_b = superficie * pu_b;
    const prix_total_d = superficie * pu_d;
    const prix_total = superficie * pu_vente;
    const total_apr = prix_total - (prix_total_b + prix_total_d);
    return { prix_total_b, prix_total_d, prix_total, total_apr };
  };

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/ventes?page=${currentPage}`)
      .then(res => {
        setVentes(res.data.data);
        setTotalPages(res.data.last_page);
      })
      .catch(console.error);
  }, [currentPage]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/chantiers')
      .then(res => setChantiers(res.data))
      .catch(console.error);
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleEdit = (idx) => {
    setEditingIndex(idx);
    setEditedRow({ ...ventes[idx] });
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditedRow({});
  };

  const handleSaveEdit = async () => {
    try {
      const totals = calculateTotals(editedRow);
      const updatedRow = { ...editedRow, ...totals };
      const res = await axios.put(`http://127.0.0.1:8000/api/ventes/${editedRow.id}`, updatedRow);
      setVentes(ventes.map((row, i) => (i === editingIndex ? res.data.data : row)));
      setEditingIndex(null);
      setEditedRow({});
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (idx) => {
    const vente = ventes[idx];
    if (!vente?.id) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/ventes/${vente.id}`);
      setVentes(ventes.filter((_, i) => i !== idx));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddRow = async (e) => {
    e.preventDefault();
    const totals = calculateTotals(newRow);
    const correctedRow = {
      ...newRow,
      ...totals,
      niveau_id: +newRow.niveau_id || null,
      superficie: +newRow.superficie || 0,
      pu_d: +newRow.pu_d || 0,
      pu_b: +newRow.pu_b || 0,
      pu_vente: +newRow.pu_vente || 0,
      statut: newRow.statut || 'en cours',
      chantier_id: +newRow.chantier_id || null,
    };

    try {
      const res = await axios.post(`http://127.0.0.1:8000/api/ventes`, correctedRow);
      setVentes([...ventes, res.data.data]);
      setNewRow({});
      setShowAddForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNewRowChange = (e, field) => {
    setNewRow(prev => ({ ...prev, [field]: e.target.value }));
  };

  const getValue = (vente, field) => {
    switch (field) {
      case "zone_id":
        return vente.niveau?.lot?.zone?.nom ?? "N/A";
      case "lot_id":
        return vente.niveau?.lot?.nom ?? "N/A";
      case "niveau_id":
        return vente.niveau?.nom ?? "N/A";
      case "chantier_id":
        return vente.niveau?.lot?.zone?.chantier?.nom ?? "N/A";
      default:
        return vente[field] ?? "N/A";
    }
  };


  

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="col-span-2">
  <label className="block mb-1 font-medium">Chantier</label>
  <select
    value={newRow.chantier_id || ''}
    onChange={(e) => setNewRow(prev => ({ ...prev, chantier_id: e.target.value }))}
    className="w-full p-2 border rounded"
  >
    <option value="">Sélectionner un chantier</option>
    {chantiers.map(chantier => (
      <option key={chantier.id} value={chantier.id}>
        {chantier.nom}
      </option>
    ))}
  </select>
</div>

      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600">Actions</th>
              {columns.map(col => (
                <th key={col.field} className="px-6 py-3 text-left text-xs font-bold text-gray-600">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ventes.map((row, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingIndex === idx ? (
                    <div className="flex space-x-2">
                      <button onClick={handleSaveEdit} className="text-green-600"><FaCheck /></button>
                      <button onClick={handleCancelEdit} className="text-red-600"><FaTimes /></button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button onClick={() => handleEdit(idx)} className="text-blue-600"><FaPen /></button>
                      <button onClick={() => handleDelete(idx)} className="text-red-600"><FaTrash /></button>
                    </div>
                  )}
                </td>
                {columns.map(col => (
                  <td key={col.field} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {editingIndex === idx ? (
                      <input
                        type={col.field === 'date' ? 'date' : 'text'}
                        value={editedRow[col.field] || ''}
                        onChange={e => setEditedRow(prev => ({ ...prev, [col.field]: e.target.value }))}
                        className="w-full p-1 border rounded"
                      />
                    ) : col.field === 'date' ? (
                      row.date ? new Date(row.date).toLocaleDateString() : 'N/A'
                    ) : (
                      getValue(row, col.field)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="max-w-7xl mx-auto mt-4 flex justify-between items-center">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Précédent</button>
        <span>Page {currentPage} sur {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Suivant</button>
      </div>

      <div className="max-w-7xl mx-auto mt-6 text-right">
        <button onClick={() => setShowAddForm(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          <FaPlus /> Ajouter une vente
        </button>
      </div>

      {showAddForm && (
        <div className="max-w-7xl mx-auto mt-6 p-4 bg-white rounded-lg shadow">
          <form onSubmit={handleAddRow} className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block mb-1 font-medium">Chantier</label>
              <select
                value={newRow.chantier_id || ''}
                onChange={e => handleNewRowChange(e, 'chantier_id')}
                className="w-full p-2 border rounded"
              >
                <option value="">-- Sélectionner un chantier --</option>
                {chantiers.map(c => (
                  <option key={c.id} value={c.id}>{c.nom}</option>
                ))}
              </select>
            </div>

            {columns.map(col => (
              <div key={col.field}>
                <label className="block mb-1 font-medium">{col.label}</label>
                <input
                  type={col.field === 'date' ? 'date' : 'text'}
                  value={newRow[col.field] || ''}
                  onChange={e => handleNewRowChange(e, col.field)}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}

            <div className="col-span-2 flex justify-between mt-4">
              <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Annuler</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Enregistrer</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Vente;
