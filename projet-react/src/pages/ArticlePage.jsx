import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const ArticlePage = () => {
  const [articles, setArticles] = useState([
    { id: 1, nom: 'Article 1' },
    { id: 2, nom: 'Article 2' },
    { id: 3, nom: 'Article 3' },
  ]);

  const [form, setForm] = useState({
    prix: '',
    quantite: '',
    unite: '',
    date: '',
  });

  const [rows, setRows] = useState([]);
  const [newArticleName, setNewArticleName] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAdd = () => {
    if (!form.prix || !form.quantite || !form.unite || !form.date) return;

    const articleNom = newArticleName.trim() || 'Article inconnu';
    const sorties = parseFloat(form.prix) * parseFloat(form.quantite);

    setRows([
      ...rows,
      {
        ...form,
        articleNom,
        sorties,
      },
    ]);

    handleAddToDatabase(form.prix, form.quantite, form.unite, form.date, sorties);
    setForm({ prix: '', quantite: '', unite: '', date: '' });
    setNewArticleName('');
  };

  const handleAddToDatabase = (prix, quantite, unite, date, sorties) => {
    const caisse_id = 1; // بدّلها حسب الحالة

    Axios.post('http://localhost:8000/api/caise_articles', {
      caisse_id,
      quantite,
      prix_unitaire: prix,
      total: sorties,
      date,
    })
      .then(response => {
        console.log('✅ Données ajoutées avec succès!', response.data);
      })
      .catch(error => {
        console.error('❌ Erreur lors de l\'ajout des données:', error);
      });
  };

  const handleCancel = () => {
    setForm({ prix: '', quantite: '', unite: '', date: '' });
    setNewArticleName('');
  };

  const handleGoToCaisse = () => {
    navigate('/caisse', { state: { sorties: rows } });
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📦 Gestion des Articles</h1>

      <table className="min-w-full text-sm border border-gray-300 mb-6">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-2 border">Article</th>
            <th className="p-2 border">Prix</th>
            <th className="p-2 border">Quantité</th>
            <th className="p-2 border">Unité</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">sorties</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="text-center">
              <td className="p-2 border">{row.articleNom}</td>
              <td className="p-2 border">{row.prix} DH</td>
              <td className="p-2 border">{row.quantite}</td>
              <td className="p-2 border">{row.unite}</td>
              <td className="p-2 border">{row.date}</td>
              <td className="p-2 border font-semibold">{row.sorties.toFixed(2)} DH</td>
            </tr>
          ))}

          <tr className="bg-gray-50">
            <td className="p-2 border">
              <input
                type="text"
                value={newArticleName}
                onChange={(e) => setNewArticleName(e.target.value)}
                placeholder="Nom de l'article"
                className="w-full p-1 border rounded"
              />
            </td>
            <td className="p-2 border">
              <input
                type="number"
                name="prix"
                value={form.prix}
                onChange={handleChange}
                className="w-full p-1 border rounded"
              />
            </td>
            <td className="p-2 border">
              <input
                type="number"
                name="quantite"
                value={form.quantite}
                onChange={handleChange}
                className="w-full p-1 border rounded"
              />
            </td>
            <td className="p-2 border">
              <input
                type="text"
                name="unite"
                value={form.unite}
                onChange={handleChange}
                className="w-full p-1 border rounded"
              />
            </td>
            <td className="p-2 border">
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full p-1 border rounded"
              />
            </td>
            <td className="p-2 border text-center">
              {(form.prix && form.quantite)
                ? (parseFloat(form.prix) * parseFloat(form.quantite)).toFixed(2) + ' DH'
                : '--'}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="space-x-4">
        <button
          onClick={handleAdd}
          className="bg-green-600 hover:bg-green-700 text-black px-4 py-2 rounded"
        >
          ➕ Ajouter
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          ❌ Annuler
        </button>
        <button
          onClick={handleGoToCaisse}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          🧾 Voir Caisse
        </button>
      </div>
    </div>
  );
};

export default ArticlePage;
