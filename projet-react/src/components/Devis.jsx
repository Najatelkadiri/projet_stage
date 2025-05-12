import React, { useState } from 'react';
import { PlusCircleIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { MdSave } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const BonCommandePage = () => {
  const [chantier, setChantier] = useState('');
  const [fournisseur, setFournisseur] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showInnerTable, setShowInnerTable] = useState(false);
  const [showAddArticleForm, setShowAddArticleForm] = useState(false);
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({
    article: '',
    description: '',
    quantite: '',
    prix: '',
    totalNet: '',
    totalTTC: '',
  });

  const handleChantierChange = (event) => setChantier(event.target.value);
  const handleFournisseurChange = (event) => setFournisseur(event.target.value);
  const handleDateChange = (event) => setSelectedDate(event.target.value);
  const handleAjouterClick = () => setShowInnerTable(true);

  const handleArticleChange = (e) => {
    const { name, value } = e.target;
    setNewArticle({ ...newArticle, [name]: value });
  };
  const navigate = useNavigate();

  const handleAddArticle = () => {
    const { article, description, quantite, prix } = newArticle;
    const parsedPrix = parseFloat(prix.replace('€', '')) || 0;
    const parsedQuantite = parseFloat(quantite) || 0;
    const totalNet = (parsedQuantite * parsedPrix).toFixed(2);
    const totalTTC = (parseFloat(totalNet) * 1.2).toFixed(2);

    setArticles([
      ...articles,
      { ...newArticle, totalNet: `${totalNet}€`, totalTTC: `${totalTTC}€` },
    ]);

    setNewArticle({
      article: '',
      description: '',
      quantite: '',
      prix: '',
      totalNet: '',
      totalTTC: '',
    });
    setShowAddArticleForm(false);
  };

  const handleDeleteArticle = (index) => {
    setArticles(articles.filter((_, i) => i !== index));
  };
  const handleSaveClick = () => {
     // Sauvegarde des informations (ici tu peux envoyer à ton API si besoin)
    const savedData = {
      chantier,
      fournisseur,
      date: selectedDate,
      articles,
    };
    
    navigate('/achat/bon-commande' , { state: savedData }); 
  };




  const handleEditArticle = (index) => {
    const articleToEdit = articles[index];
    setNewArticle({ ...articleToEdit, prix: articleToEdit.prix.replace('€', '') });
    handleDeleteArticle(index);
    setShowAddArticleForm(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">Devis</h1>

      {/* Filtres */}
      <div className="flex flex-wrap gap-6 mb-6">
        <div>
          <label className="block text-lg font-medium mb-1">Chantier</label>
          <select
            value={chantier}
            onChange={handleChantierChange}
            className="border rounded px-4 py-2 w-64"
          >
            <option value="">Sélectionnez un chantier</option>
            <option value="chantier1">Chantier 1</option>
            <option value="chantier2">Chantier 2</option>
            <option value="chantier3">Chantier 3</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium mb-1">Fournisseur</label>
          <select
            value={fournisseur}
            onChange={handleFournisseurChange}
            className="border rounded px-4 py-2 w-64"
          >
            <option value="">Sélectionnez un fournisseur</option>
            <option value="fournisseur1">Fournisseur 1</option>
            <option value="fournisseur2">Fournisseur 2</option>
            <option value="ajouter">+ Ajouter fournisseur</option>
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-lg font-medium mb-1">Date</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="border border-gray-300 rounded px-4 py-2 w-52 shadow"
          />
        </div>
      </div>

      {/* Bouton d'ajouter un article */}
      <button
        onClick={() => setShowAddArticleForm(true)}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mb-6"
      >
        Ajouter un article
      </button>

      {/* Formulaire d'ajout d'article */}
      {showAddArticleForm && (
        <div className="mb-6 bg-white p-4 rounded shadow">
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-lg font-medium mb-1">Article</label>
              <input
                type="text"
                name="article"
                value={newArticle.article}
                onChange={handleArticleChange}
                className="border rounded px-4 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-1">Description</label>
              <input
                type="text"
                name="description"
                value={newArticle.description}
                onChange={handleArticleChange}
                className="border rounded px-4 py-2 w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-lg font-medium mb-1">Quantité</label>
              <input
                type="number"
                name="quantite"
                value={newArticle.quantite}
                onChange={handleArticleChange}
                className="border rounded px-4 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-1">Prix (€)</label>
              <input
                type="text"
                name="prix"
                value={newArticle.prix}
                onChange={handleArticleChange}
                className="border rounded px-4 py-2 w-full"
              />
            </div>
          </div>
          <button
            onClick={handleAddArticle}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Ajouter
          </button>
        </div>
      )}

      {/* Table principale */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Action</th>
              <th className="py-3 px-6 text-left">Référence</th>
              <th className="py-3 px-6 text-left">Statut devis</th>
              <th className="py-3 px-6 text-left">Document bon de commnde</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            <tr className="border-b border-gray-200 hover:bg-gray-100 align-top">
              <td className="py-3 px-6">
                <button
                  onClick={handleAjouterClick}
                  className="text-green-600 hover:text-green-800"
                  title="Ajouter"
                >
                  <PlusCircleIcon className="w-9 h-8" />
                </button>
                <button onClick={handleSaveClick}>
                <MdSave className="w-9 h-8" />
               
                </button>
              </td>
              <td className="py-3 px-6">Ref-001</td>
              <td className="py-3 px-6">
                devis Status
              </td>
              <td className="py-3 px-6">
                {showInnerTable && (
                  <table className="min-w-full table-fixed border mt-2 text-sm">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="border px-2 py-1">Articles</th>
                        <th className="border px-2 py-1">Description</th>
                        <th className="border px-2 py-1">Quantité</th>
                        <th className="border px-2 py-1">Prix</th>
                        <th className="border px-2 py-1">Total net</th>
                        <th className="border px-2 py-1">Total TTC</th>
                        <th className="border px-2 py-1">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles.map((article, index) => (
                        <tr key={index}>
                          <td className="border px-2 py-1">{article.article}</td>
                          <td className="border px-2 py-1">{article.description}</td>
                          <td className="border px-2 py-1">{article.quantite}</td>
                          <td className="border px-2 py-1">{article.prix}</td>
                          <td className="border px-2 py-1">{article.totalNet}</td>
                          <td className="border px-2 py-1">{article.totalTTC}</td>
                          <td className="border px-2 py-1 flex gap-2">
                            <button
                              onClick={() => handleEditArticle(index)}
                              className="text-yellow-600 hover:text-yellow-800"
                              title="Modifier"
                            >
                              <PencilIcon className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteArticle(index)}
                              className="text-red-600 hover:text-red-800"
                              title="Supprimer"
                            >
                              <TrashIcon className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BonCommandePage;
