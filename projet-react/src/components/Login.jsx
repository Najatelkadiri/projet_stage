// src/pages/Login.jsx
import { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email: form.email,
        password: form.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response && response.data) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        navigate('/menu');
        setForm({ email: '', password: '' });
      } else {
        setError('Une erreur est survenue lors de la connexion.');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Erreur lors de la connexion');
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/img.jpg')` }}
    >
      <div className="w-full max-w-sm bg-white/70 backdrop-blur-sm p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Se connecter</h2>
        {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Mot de passe"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
