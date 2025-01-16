import './App.css';
import HeroSection from "./pages/student/HeroSection";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <main > 
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </>
  );
}

export default App;