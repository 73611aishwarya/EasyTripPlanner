import { useNavigate } from "react-router-dom";
import heroBg from "../assets/herobacklogo.png"; // adjust path if needed
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();
  const hour = new Date().getHours();

  let quote = "";
  let moodClass = "";

  if (hour < 12) {
    quote = "Rise, shine, and find your next horizon.";
    moodClass = "morning";
  } else if (hour < 18) {
    quote = "Every great story starts with an easy first step.";
    moodClass = "afternoon";
  } else {
    quote = "Sleep on your dreams, then wake up and book them.";
    moodClass = "evening";
  }

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className={`hero-quote ${moodClass}`}>
        {quote}
      </h1>

      <p className="hero-subtext">
        Plan trips effortlessly with Easy Trip – discover destinations,
        manage budgets, and travel smarter.
      </p>

      <div className="hero-buttons">
        <button onClick={() => navigate("/login")} className="btn-primary">
          Login
        </button>

        <button onClick={() => navigate("/register")} className="btn-secondary">
          Sign Up
        </button>
      </div>
    </section>
  );
}

export default Hero;

