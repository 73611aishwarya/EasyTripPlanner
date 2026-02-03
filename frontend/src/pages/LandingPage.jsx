import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

import "./LandingPage.css"; 
function LandingPage() {
  return (
    <>
       <div className="landing-page">
      <Navbar />
      <Hero/>
      <Footer/>
      </div>
    </>
  );
}

export default LandingPage;
