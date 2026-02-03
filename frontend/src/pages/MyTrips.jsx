import { useEffect, useState } from "react";
import api from "../services/api";
import "./MyTrip.css";
function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
  };

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await api.get("/booking/my-trips");
        setTrips(res.data);
      } catch (err) {
        setError("Failed to load trips");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  if (loading) return <p>Loading trips...</p>;
  if (error) return <p>{error}</p>;
  if (trips.length === 0) return <p>No trips found.</p>;

  return (
    <div className="my-trips">
      <h1>My Trips</h1>

      {trips.map((trip) => (
        <div key={trip.bookingId} className="trip-card">
          <h3>{trip.destination}</h3>

          <p>
            <strong>Booking Status:</strong>{" "}
            <span
              style={{
                color:
                  trip.bookingStatus === "Confirmed" ? "green" : "orange",
              }}
            >
              {trip.bookingStatus}
            </span>
          </p>

          <p>
            <strong>Booking Date:</strong>{" "}
            {formatDate(trip.bookingDate)}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MyTrips;
