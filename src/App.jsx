import React from 'react';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import About from './Components/About';
function App() {
  return (
    <div className="min-h-screen overflow-hidden no-scrollbar">
      <Navbar />

      <main >  
        <Banner />
        <About />
        
      </main>
    </div>
  );
}

export default App;