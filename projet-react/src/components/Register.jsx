// src/pages/Register.jsx
import { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.password_confirmation,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response && response.data) {
        const { token } = response.data;

        localStorage.setItem('token', token);
        navigate('/profile');
        setForm({ name: '', email: '', password: '', password_confirmation: '' });
      } else {
        setError('Une erreur est survenue pendant l\'inscription.');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Erreur lors de l\'inscription');
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      <img
        src="/img.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-full max-w-md bg-white/70 backdrop-blur-sm p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Créer un compte</h2>
          {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Nom complet"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
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
            <div className="mb-4">
              <input
                type="password"
                placeholder="Mot de passe"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Confirmer le mot de passe"
                value={form.password_confirmation}
                onChange={e => setForm({ ...form, password_confirmation: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
            >
              {loading ? 'Inscription en cours...' : 'S\'inscrire'}
            </button>
          </form>

          <div className="mt-4 text-center text-gray-700">
            <p>Vous avez déjà un compte ? <a href="/login" className="text-blue-500 hover:underline">Connectez-vous</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
