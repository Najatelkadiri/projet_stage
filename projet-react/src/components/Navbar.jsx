import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">MyApp</h1>
      <div className="space-x-4">
        <Link to="/Dashbord" className="text-gray-700 hover:text-blue-600">Se connecter</Link>
        <Link to="/register" className="text-gray-700 hover:text-blue-600">S’inscrire</Link>
      </div>
    </nav>
  );
};

export default Navbar;
