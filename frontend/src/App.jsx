import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import Home from "./pages/Home";
import Mydestination from "./pages/Mydestination";
import Help from "./pages/Help";
import AboutUs from "./pages/AboutUs";
import Feedback from "./pages/Feedback";
import MyTrips from "./pages/MyTrips";





import "./App.css";

function App() {
  return (
    <div className="app-layout">
      <div className="page-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />

          <Route path="/home" element={<Home />} />
          <Route path="/destination" element={<Mydestination/>}/>
          <Route path="/help" element={<Help/>}/>
          <Route path="/about" element={<AboutUs/>}/>
          <Route path="/feedback" element={<Feedback/>}/>
          <Route path="/trips" element={<MyTrips />} />
       

    
         
          
        </Routes>
      </div>
    </div>
  );
}

export default App;

