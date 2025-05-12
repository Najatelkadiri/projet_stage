import { useEffect, useState } from 'react';

const Vente2 = () => {
  const [ventes, setVentes] = useState([]);
  
  const [newVente, setNewVente] = useState({
    reference: '',
    solde: '',
    date: '',
  });
  const [editingIndex, setEditingIndex] = useState(null); 

  const handleAdd = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedVentes = ventes.map((vente, index) => 
        index === editingIndex ? newVente : vente
      );
      setVentes(updatedVentes);
      setEditingIndex(null); 
    } else {
      setVentes([...ventes, newVente]);
    }
    
    setNewVente({
      reference: '',
      solde: '',
      date: '',
    });
  };

  const handleDelete = (index) => {
    const updatedVentes = ventes.filter((vente, venteIndex) => venteIndex !== index);
    setVentes(updatedVentes);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVente({
      ...newVente,
      [name]: value,
    });
  };

  const handleEdit = (index) => {
    const venteToEdit = ventes[index];
    setNewVente({ ...venteToEdit });
    setEditingIndex(index); 
  };

  useEffect(() => {
    fetch('/livre-de-caisse') // استخدم الرابط relatif فقط
      .then(response => response.json())
      .then(data => setVentes(data.content))
      .catch(error => console.error('Erreur de chargement des ventes:', error));
  }, []);
  
  

  return (
    <>
      <form onSubmit={handleAdd} className="form-container">
        <h2>{editingIndex !== null ? 'Modifier une Vente' : 'Ajouter une Vente'}</h2>

        <div className="form-group">
          <label>REFERENCE :</label>
          <input
            type="text"
            name="reference"
            value={newVente.reference}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>SOLDE :</label>
          <input
            type="number"
            name="solde"
            value={newVente.solde}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={newVente.date}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">{editingIndex !== null ? 'Mettre à jour' : 'Ajouter'}</button>
      </form>

      <table className="vente-table">
        <thead>
          <tr>
            <th>Action</th>
            <th>REFERENCE</th>
            <th>SOLDE</th>
            <th>DATE</th>
          </tr>
        </thead>
        <tbody>
          {ventes.map((vente, index) => (
            <tr key={index}>
              <td>
                <button onClick={() => handleEdit(index)}>✏</button>
                <button onClick={() => handleDelete(index)}>🗑</button>
              </td>
              <td>{vente.reference}</td>
              <td>{vente.solde}</td>
              <td>{new Date(vente.date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric'
              })}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .form-container {
          padding: 20px;
          max-width: 500px;
          margin: 30px auto;
          border: 1px solid #ccc;
          border-radius: 10px;
          background-color: #fdfdfd;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .form-container h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .form-group input {
          width: 100%;
          padding: 8px;
          border-radius: 6px;
          border: 1px solid #ccc;
        }

        button[type="submit"] {
          background-color: #28a745;
          color: white;
          border: none;
          padding: 10px;
          cursor: pointer;
          border-radius: 6px;
          width: 100%;
          font-size: 16px;
        }

        button[type="submit"]:hover {
          background-color: #218838;
        }

        .vente-table {
          width: 90%;
          margin: 30px auto;
          border-collapse: collapse;
        }

        .vente-table th, .vente-table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: center;
        }

        .vente-table th {
          background-color: #f4f4f4;
        }

        .vente-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        .vente-table button {
          margin: 0 5px;
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
        }

        .vente-table button:hover {
          transform: scale(1.2);
        }
      `}</style>
    </>
  );
};

export default Vente2;
