import { useState, useEffect } from "react";

import api from "../services/api";
import "./Mydestination.css";
import { useRef } from "react";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


const destinations = [
  { id: 1, name: "Goa", season: "Summer", image: "/destinations/goa.jpg", baseCost: 3000 },
  { id: 2, name: "Manali", season: "Winter", image: "/destinations/manali.jpg", baseCost: 2500 },
  { id: 3, name: "Mumbai", season: "Rainy", image: "/destinations/mumbai.jpg", baseCost: 3500 },
  { id: 4, name: "Jaisalmer", season: "Winter", image: "/destinations/jaisalmer.jpg", baseCost: 2800 },
  { id: 5, name: "Jaipur", season: "Winter", image: "/destinations/jaipur.jpg", baseCost: 2400 },
  { id: 6, name: "Ladakh", season: "Summer", image: "/destinations/ladakh.jpg", baseCost: 4000 },
  { id: 7, name: "Kerala", season: "Rainy", image: "/destinations/kerala.jpg", baseCost: 3000 },
  { id: 8, name: "Delhi", season: "Winter", image: "/destinations/delhi.jpg", baseCost: 3000 },
  { id: 9, name: "Ooty", season: "Winter", image: "/destinations/ooty.jpg", baseCost: 3000 },
  { id: 10, name: "Shimla", season: "Winter", image: "/destinations/shimla.jpg", baseCost: 3000 },
];

export default function Mydestination() {
  const [season, setSeason] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = season
    ? destinations.filter((d) => d.season === season)
    : destinations;

  return (
    <>
      <div className="destination-page">
        <h1 className="page-title">
          Choose Your Destination and Confirm Your Itinerary!
        </h1>

        <div className="filters">
          <select onChange={(e) => setSeason(e.target.value)}>
            <option value="">All Seasons</option>
            <option value="Summer">Summer</option>
            <option value="Winter">Winter</option>
            <option value="Rainy">Rainy</option>
          </select>
        </div>

        <div className="destination-grid">
          {filtered.map((d) => (
            <div
              key={d.name}
              className="destination-card"
              onClick={() => setSelected(d)}
            >
              <img src={d.image} alt={d.name} />
              <div className="card-header">
                <h3>{d.name}</h3>

               
                <span className={`season ${d.season.toLowerCase()}`}>
                  {d.season}
                </span>

              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <BookingPopup destination={selected} close={() => setSelected(null)} />
      )}
    </>
  );
}

/* ---------------- POPUP COMPONENT ---------------- */

function BookingPopup({ destination, close }) {




const paymentPollInterval = useRef(null);
 
  const [days, setDays] = useState(3);
  const [mode, setMode] = useState("Bus");
  const [hotel, setHotel] = useState("3 Star");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [weather, setWeather] = useState(null);
  const [saved, setSaved] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [confirming, setConfirming] = useState(false);
const [confirmed, setConfirmed] = useState(false);
const [failed, setFailed] = useState(false);


useEffect(() => {
  if (confirmed) {
    setTimeout(() => {
      close();
      window.location.href = "/my-trips";
    }, 1500);
  }
}, [confirmed]);


useEffect(() => {
  return () => {
    if (paymentPollInterval.current) {
      clearInterval(paymentPollInterval.current);
    }
  };
}, []);

  /* ---------- WEATHER ---------- */
 useEffect(() => {
  if (!destination?.name) return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${destination.name},IN&units=metric&appid=${WEATHER_API_KEY}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Weather API failed");
      }
      return res.json();
    })
    .then((data) => {
      console.log("Weather data:", data);

      if (data.main && typeof data.main.temp === "number") {
        setWeather(data.main.temp);
      }
    })
    .catch((err) => {
      console.error(err);
      setWeather(null);
    });
}, [destination.name]);



  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const travelCostMap = {
    Bus: 1500,
    Train: 3000,
    Flight: 6500,
  };

  const hotelCostMap = {
    "3 Star": 2000,
    "4 Star": 3200,
    "5 Star": 4500,
  };

  const seasonMultiplier =
    destination.season === "Winter"
      ? 1.15
      : destination.season === "Summer"
      ? 1.1
      : 0.95;

  const travelerFactor = adults + children * 0.5;

  const total =
    (
      days *
        (destination.baseCost + hotelCostMap[hotel]) *
        travelerFactor +
      travelCostMap[mode] * travelerFactor
    ) * seasonMultiplier;



const handleSaveItinerary = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first.");
      return;
    }

   
    const payload = {
      Destination: destination.name,            
      Days: Number(days),
      Adults: Number(adults),
      Children: Number(children),
      TravelMode: mode.charAt(0).toUpperCase() + mode.slice(1).toLowerCase(), 
      HotelCategory: hotel,       
      TotalAmount: Number(Math.round(total)),                  
    };

    console.log("Booking payload sent:", payload);

    const response = await api.post("/Booking/create", payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Booking created:", response.data);
    setBookingId(response.data.bookingId);
    setSaved(true);
  } catch (error) {
    console.error("Booking failed:", error);
    if (error.response?.data) {
      alert("Failed to save itinerary: " + JSON.stringify(error.response.data));
    } else {
      alert("Failed to save itinerary");
    }
  }
};









const handlePayment = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Please login again");
    return;
  }
  if (!bookingId) {
    alert("Booking ID missing");
    return;
  }

  const payload = {
    bookingId,
    amount: Math.round(total),
    customerName: user.name,
    customerEmail: user.email,
    customerPhone: user.phone || "0000000000",
  };

  try {
    setConfirming(true);

    const res = await api.post("/payment/create-order", payload);
    const {  paymentSessionId } = res.data;
    

    const cashfree = new window.Cashfree({ mode: "sandbox" });

    cashfree.checkout({
      paymentSessionId,
      redirectTarget: "_modal",
      onSuccess: async  (data)  => {

          paymentResolved = true;
        

        // Clear polling
        if (paymentPollInterval.current) clearInterval(paymentPollInterval.current);

         const orderIdFromCashfree = data.orderId;
         const transactionIdFromCashfree = data.paymentId;
         // 1. Notify backend payment success with orderId and transactionId
    await api.post(
  "/payment/payment-success",
  {
    orderId: orderIdFromCashfree,
    transactionId: transactionIdFromCashfree,
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);

        

        // Update UI states
        setConfirmed(true);
        setConfirming(false);

        alert("Payment successful! Booking confirmed.");
      },
      onFailure: () => {
        if (paymentPollInterval.current) clearInterval(paymentPollInterval.current);
        setFailed(true);
        setConfirming(false);
        alert("Payment failed. Please try again.");
      },
      onAbort: () => {
        if (paymentPollInterval.current) clearInterval(paymentPollInterval.current);
        setConfirming(false);
        alert("Payment cancelled.");
      }
    });
    let paymentResolved = false;

    // Poll backend payment status every 3 seconds (fallback)
   paymentPollInterval.current = setInterval(async () => {
     if (paymentResolved) return;
  try {
    const statusRes = await api.get(`/payment/status/${bookingId}`);

    if (
      statusRes.data.paymentStatus === "Paid" &&
      statusRes.data.bookingStatus === "Confirmed"
    ) {
      clearInterval(paymentPollInterval.current);
      setConfirmed(true);
      setConfirming(false);
    }
  } catch (err) {
    console.error("Polling error:", err);
  }
}, 3000);

  } catch (err) {
    if (paymentPollInterval.current) clearInterval(paymentPollInterval.current);
    console.error("Payment initiation error", err);
    alert(err.response?.data || "Payment failed");
    setFailed(true);
    setConfirming(false);
  }
};


  return (
    <div className="custom-modal-overlay" onClick={close}>
      <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
        <h2>{destination.name} Trip Planner</h2>

        <label>Number of Days</label>
        <select value={days} onChange={(e) => setDays(+e.target.value)}>
          <option value={3}>3 Days</option>
          <option value={4}>4 Days</option>
          <option value={5}>5 Days</option>
        </select>

        <label>Travel Mode</label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option>Bus</option>
          <option>Train</option>
          <option>Flight</option>
        </select>

        <label>Hotel Category</label>
        <select value={hotel} onChange={(e) => setHotel(e.target.value)}>
          <option>3 Star</option>
          <option>4 Star</option>
          <option>5 Star</option>
        </select>

        <label>Adults</label>
        <input
          type="number"
          min="1"
          value={adults}
          onChange={(e) => setAdults(+e.target.value)}
        />

        <label>Children</label>
        <input
          type="number"
          min="0"
          value={children}
          onChange={(e) => setChildren(+e.target.value)}
        />

        <p>Weather: {weather ? `${weather}°C` : "Loading..."}</p>

        <h3>Total Estimated Budget: ₹{Math.round(total)}</h3>

       <button className="confirm" onClick={handleSaveItinerary}>
  Book Itinerary
</button>


        {saved && (
          <>
            <div className="saved-msg"> Itinerary Saved Successfully</div>

            <div className="itinerary-summary">
              <p><strong>Destination:</strong> {destination.name}</p>
              <p><strong>Days:</strong> {days}</p>
              <p><strong>Travel Mode:</strong> {mode}</p>
              <p><strong>Hotel:</strong> {hotel}</p>
              <p><strong>Adults:</strong> {adults}</p>
              <p><strong>Children:</strong> {children}</p>
              <p><strong>Season:</strong> {destination.season}</p>

              <h3>Total Payable: ₹{Math.round(total)}</h3>
            </div>

           
          </>
        )}

      <button
  className="confirm"
  onClick={handlePayment}
  disabled={!bookingId || confirming || confirmed}
>
  {confirming ? "Processing Payment..." : confirmed ? "Booking Confirmed" : "Pay Now"}
</button>


{confirming && (
  <p style={{ marginTop: "10px", color: "#0d6efd" }}>
     Waiting for payment confirmation...
  </p>
)}

{confirmed && (
  <p style={{ marginTop: "10px", color: "green" }}>
     Payment successful. Booking confirmed!
  </p>
)}

{failed && (
  <p style={{ marginTop: "10px", color: "red" }}>
     Payment failed. Please try again.
  </p>
)}

      </div>
    </div>
  );
}
                               
