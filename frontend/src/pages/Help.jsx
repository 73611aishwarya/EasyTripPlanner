import "./Help.css";

export default function Help() {
  return (
    <div className="help-page">
      <h1 className="help-title">Help & Support</h1>
      <p className="help-subtitle">
        Find answers to common questions and learn how to use Easy Trip Planner
        effectively.
      </p>

     
      <div className="help-section">
        <h2> Getting Started</h2>
        <p>
          Easy Trip Planner helps you plan trips quickly with budget estimation,
          destination insights, and itinerary management.
        </p>
        <ul>
          <li>Select a destination</li>
          <li>Choose trip duration (3, 4, or 5 days)</li>
          <li>Select travel mode and hotel category</li>
          <li>Save itinerary and proceed to payment</li>
        </ul>
      </div>

      
      <div className="help-section">
        <h2>Destinations & Filters</h2>
        <p>
          Destinations are categorized based on the best season to visit.
        </p>
        <ul>
          <li>Summer Destinations</li>
          <li>Winter Destinations</li>
          <li>Rainy Season Destinations</li>
        </ul>
        <p>
          Use the season filter on the destination page to quickly find suitable
          places.
        </p>
      </div>

    
      <div className="help-section">
        <h2>Budget Calculation</h2>
        <p>Your total trip cost is calculated based on:</p>
        <ul>
          <li>Base destination cost</li>
          <li>Travel mode (Bus, Train, Flight)</li>
          <li>Hotel category (3, 4, 5 Star)</li>
          <li>Number of days</li>
          <li>Number of travelers</li>
          <li>Seasonal demand</li>
        </ul>
        <p className="note">
          Note: Prices are estimates and may vary depending on availability.
        </p>
      </div>

   
      <div className="help-section">
        <h2>Itinerary</h2>
        <p>
          After selecting trip details, you can save your itinerary. Once saved:
        </p>
        <ul>
          <li>Your trip summary is displayed</li>
          <li>Total payable amount is shown</li>
          <li>You can proceed to payment</li>
        </ul>
      </div>

     
      <div className="help-section">
        <h2> Payments</h2>
        <p>
          Payments are handled through a secure payment gateway to ensure safety.
        </p>
        <ul>
          <li>Secure checkout</li>
          <li>Instant payment confirmation</li>
          <li>Trusted payment providers</li>
        </ul>
      </div>

  
      <div className="help-section">
        <h2>Weather Information</h2>
        <p>
          Weather details shown in the trip planner are fetched from reliable
          third-party APIs to help you plan better.
        </p>
      </div>

  
      <div className="help-section">
        <h2> Contact Us</h2>
        <p>If you still need assistance, reach out to us:</p>
        <p><strong>Email:</strong> support@easytripplanner.com</p>
        <p><strong>Phone:</strong> +91 98765 43210</p>
        <p><strong>Working Hours:</strong> Mon - Fri, 9 AM - 6 PM</p>
      </div>
    </div>
  );
}

