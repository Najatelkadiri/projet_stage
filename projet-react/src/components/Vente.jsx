import React, { useEffect, useState } from 'react';
import { FaPen, FaTrash, FaCheck, FaTimes, FaPlus } from 'react-icons/fa';
import axios from 'axios';

const Vente = () => {
  const [ventes, setVentes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRow, setNewRow] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const columns = [
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
    fetch(`http://127.0.0.1:8000/api/ventes?page=${currentPage}`)
      .then(res => res.json())
      .then(data => {
        setVentes(data.data);
        setTotalPages(data.last_page);
      })
      .catch(console.error);
  }, [currentPage]);

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
      const res = await axios.put(`http://127.0.0.1:8000/api/ventes/${ventes[editingIndex].id}`, updatedRow);
      setVentes(ventes.map((row, i) => (i === editingIndex ? res.data.data : row)));
      setEditingIndex(null);
      setEditedRow({});
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (idx) => {
    setVentes(v => v.filter((_, i) => i !== idx));
  };

  const handleAddRow = (e) => {
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
    };
    setVentes(prev => [...prev, correctedRow]);
    localStorage.setItem('localVentes', JSON.stringify([...ventes, correctedRow]));
    setNewRow({});
    setShowAddForm(false);
  };

  const handleNewRowChange = (e, field) => {
    setNewRow(prev => ({ ...prev, [field]: e.target.value }));
  };

  const getValue = (row, field) => {
    if (field.endsWith('_id')) {
      const relation = field.replace('_id', '');
      return row[relation]?.nom ?? 'N/A';
    }
    return row[field] ?? 'N/A';
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
              {columns.map(col => (
                <th key={col.field} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {col.label}
                </th>
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
                      <button onClick={handleCancelEdit} className="text-red-500"><FaTimes /></button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button onClick={() => handleEdit(idx)} className="text-blue-600"><FaPen /></button>
                      <button onClick={() => handleDelete(idx)} className="text-red-600"><FaTrash /></button>
                    </div>
                  )}
                </td>
                {columns.map(col => (
                  <td key={col.field} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editingIndex === idx ? (
                      <input
                        type={col.field === 'date' ? 'date' : 'text'}
                        value={editedRow[col.field] || ''}
                        onChange={e => setEditedRow(prev => ({ ...prev, [col.field]: e.target.value }))}
                        className="w-full p-2 border rounded"
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

      <div className="max-w-7xl mx-auto mt-4 flex items-center justify-between">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Précédent
        </button>
        <span>Page {currentPage} sur {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Suivant
        </button>
      </div>

      <div className="max-w-7xl mx-auto mt-6 text-right">
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          <FaPlus /> Ajouter une vente
        </button>
      </div>

      {showAddForm && (
        <div className="max-w-7xl mx-auto mt-6 p-4 bg-white rounded-lg shadow">
          <form onSubmit={handleAddRow} className="grid grid-cols-2 gap-4">
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
            <div className="col-span-
2 flex justify-between">
<button
type="button"
onClick={() => setShowAddForm(false)}
className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
>
Annuler
</button>
<button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" >
Enregistrer
</button>
</div>
</form>
</div>
)}
</div>
);
};

export default Vente;