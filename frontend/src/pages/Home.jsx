import { Link } from "react-router-dom";


import "./Home.css";

const popularDestinations = [
  {
    name: "Jaisalmer",
    image: "/destinations/jaisalmer.jpg",
  },
  {
    name: "Manali",
    image: "/destinations/manali.jpg",
  },
  {
    name: "Mumbai",
    image: "/destinations/mumbai.jpg",
  },
  {
    name: "Goa",
    image: "/destinations/goa.jpg",
  },
];

export default function Home() {
  

  return (
    <>
    
      <nav className="home-nav">
        <div className="nav-logo">
          <Link to="/">
            <img src="/mylogo.png" alt="Easy Trip Logo" />
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/trips">My Trips</Link>
          <Link to="/destination">Destination</Link>
           <Link to="/">Logout</Link>
        </div>
      </nav>

      <section className="hero-section">
        <div
          className="hero-banner"
          style={{
            backgroundImage: "url('/destinations/covergoa.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          
          <div className="hero-overlay"></div>

      
          <Link to="/destination" className="explore-button hero-explore">
            Explore
          </Link>

          <div className="hero-text">
            <h1 className="hero-title">Discover Your Next Adventure</h1>
            <p className="hero-subtitle">
              Explore popular destinations and customize your perfect trip.
            </p>
          </div>
        </div>

       
        <section className="popular-destinations">
          <h2 className="section-title">Popular Destinations</h2>
          <div className="destinations-grid">
            {popularDestinations.map(({ name, image }) => (
              <div key={name} className="destination-card">
                <img src={image} alt={name} />
                <div className="destination-name">{name}</div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}
