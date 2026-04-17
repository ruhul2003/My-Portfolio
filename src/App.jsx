import React from 'react';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import About from './Components/About';
function App() {
  return (
    <div className="min-h-screen overflow-x-hidden no-scrollbar">
      <Navbar />

      <main >   {/* Increased from md:pt-24 to md:pt-28 or higher */}
        <Banner />
        <About />
        {/* more sections */}
      </main>
    </div>
  );
}

export default App;