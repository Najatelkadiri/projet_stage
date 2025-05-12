import React from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { MdSave } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom';

const AnotherComponent = () => {
  const location = useLocation();
  const navigate = useNavigate(); // <== تم إضافته
  const { chantier, fournisseur, date, articles } = location.state || {};

  const handleSaveClick = () => {
    const savedData = {
      chantier,
      fournisseur,
      date,
      articles,
    };

    navigate('/bon-livraison', { state: savedData });
  };

  const handleAddArticle = () => {
    // هذا مجرد مثال، هنا يمكنك فتح مودال لإضافة article أو التنقل لصفحة إضافة
    alert("Ajouter un nouvel article (fonction à implémenter)");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">Détails Bon Commande</h1>
      <div className="mb-6 space-y-2">
        <div>
          <span className="font-medium">Chantier:</span> {chantier}
        </div>
        <div>
          <span className="font-medium">Fournisseur:</span> {fournisseur}
        </div>
        <div>
          <span className="font-medium">Date:</span> {date}
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg mt-6 mx-auto max-w-4xl">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Actions</th>
              <th className="py-3 px-6 text-left">Référence</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Bon de Commande</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            <tr>
              <td className="flex gap-2 items-center py-4 px-4">
                <button onClick={handleAddArticle} className="text-green-600 hover:text-green-800" title="Ajouter Article">
                  <PlusCircleIcon className="w-7 h-7" />
                </button>
                <button onClick={handleSaveClick} className="text-blue-600 hover:text-blue-800" title="Sauvegarder">
                  <MdSave className="w-7 h-7" />
                </button>
              </td>
              <td>BD-1-2025</td>
              <td>Bon de commande</td>
              <td colSpan="3" className="text-center py-6">
                <div className="overflow-x-auto bg-gray-50 shadow rounded-lg mx-auto max-w-4xl">
                  <table className="min-w-full table-auto">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
                      <tr>
                        <th className="py-3 px-6 text-left">Article</th>
                        <th className="py-3 px-6 text-left">Description</th>
                        <th className="py-3 px-6 text-left">Quantité</th>
                        <th className="py-3 px-6 text-left">Prix</th>
                        <th className="py-3 px-6 text-left">Total Net</th>
                        <th className="py-3 px-6 text-left">Total TTC</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 text-xs font-light">
                      {articles && articles.map((article, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                          <td className="py-3 px-6 text-center">{article.article}</td>
                          <td className="py-3 px-6 text-center">{article.description}</td>
                          <td className="py-3 px-6 text-center">{article.quantite}</td>
                          <td className="py-3 px-6 text-center">{article.prix}</td>
                          <td className="py-3 px-6 text-center">{article.totalNet}</td>
                          <td className="py-3 px-6 text-center">{article.totalTTC}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnotherComponent;
