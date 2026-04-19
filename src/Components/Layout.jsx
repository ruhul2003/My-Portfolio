// src/Components/Layout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white">
      <Navbar />

      <main className="flex-1">
        <div className="pt-20">   {/* Space for fixed navbar */}
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;