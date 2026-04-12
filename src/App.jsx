import Navbar from "./Layout/Navbar"
import About from "./Sections/About"
import Projects from "./Sections/Projects"
import Testimonials from "./Sections/Testimonials"
import Contact from "./Sections/Contact"

function App() {
  

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      <main>
        {/* <About />
        <Projects/>
        <Testimonials/>
        <Contact/> */}
      </main>
    </div>
  )
}

export default App
