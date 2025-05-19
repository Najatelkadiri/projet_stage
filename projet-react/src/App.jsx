import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuPage from './pages/MenuPage.jsx';
import HomePage from './pages/HomePage.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';

// الصفحات
import AvanceDetailPage from './pages/AvanceDetailPage';
import ProfilePage from './pages/ProfilePage.jsx';
import LivreCaisse from './pages/LivreDeCaissePage';
import Stock from './pages/StockPage';
import Taxe from './pages/TaxePage';
import VentePage from './pages/VentePage';
import DevisPage from './pages/DevisPage';
import BonCommandePage from './pages/BonCommandePage';
import BonLivraisonPage from './pages/BonLivraisonPage';
import FacturePage from './pages/FacturePage';
import CaissePage from './pages/CaissePage';
import ArticlePage from './pages/ArticlePage';
import DashboardPage from './pages/DashboardPage';

function App() {
  const [sorties, setSorties] = useState([
    { montant: 100 },
    { montant: 200 },
    { montant: 150 },
  ]);

  const updateSorties = (newSorties) => {
    setSorties(newSorties);
  };

  return (
    <Router>
      <div className="flex" >
      <MenuPage />
     <div className="app flex min-h-screen">
          <main className="flex-1 bg-gray-100 p-6 overflow-y-autoz ml-72">
        <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/vente" element={<VentePage />} />
            {/* <Route path="/login" element={<Login />} /> */}
             <Route path="/profile" element={<ProfilePage />} />
            {/* <Route path="/register" element={<Register />} /> */}
            {/* <Route path="/menu" element={<MenuPage />} /> */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/avance-detail" element={<AvanceDetailPage />} />
            <Route path="/avance-detail/:id" element={<AvanceDetailPage />} />
            <Route path="/livre-caisse" element={<LivreCaisse />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/taxe" element={<Taxe />} />
            {/* صفحات فرعية للشراء */}
            <Route path="/devis" element={<DevisPage />} />
            <Route path="/achat/bon-commande" element={<BonCommandePage />} />
            <Route path="/achat/bon-livraison" element={<BonLivraisonPage />} />
            <Route path="/achat/facture" element={<FacturePage />} />
            <Route path="/caisse" element={<CaissePage sorties={sorties} />} />
            <Route path="/article" element={<ArticlePage sorties={sorties} />} />
               
          </Routes>
      </main>
      
        </div>
      </div>
    </Router>
  );
}

export default App;
