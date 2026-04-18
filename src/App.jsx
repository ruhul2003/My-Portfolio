import React from 'react';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import About from './Components/About';
import Education from './Components/Education';
import Services from './Components/Services';
import Footer from './Components/Footer';
function App() {
  return (
    <div className="min-h-screen overflow-hidden no-scrollbar">
      <Navbar />

      <main >  
        <Banner />
        <About />
        <Education />
        <Services />
        <Footer />
      </main>
    </div>
  );
}

export default App;