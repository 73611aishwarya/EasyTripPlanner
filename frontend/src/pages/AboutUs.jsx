export default function About() {
  return (
    <div style={{ minHeight: "100vh", overflowY: "auto" }}>
      
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container text-center">
          <h1 className="fw-bold mb-3">About Easy Trip Planner</h1>
          <p className="lead">
            Plan smarter. Travel better. Explore more.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title fw-semibold">Who We Are</h5>
                  <p className="card-text text-muted">
                    Easy Trip Planner is a travel planning platform designed to
                    help users explore destinations, manage budgets, and plan
                    trips efficiently using modern web technologies.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title fw-semibold">What We Offer</h5>
                  <ul className="text-muted ps-3">
                    <li>Destination exploration</li>
                    <li>Best season guidance</li>
                    <li>Budget estimation</li>
                    <li>Real-time weather updates</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title fw-semibold">Our Mission</h5>
                  <p className="card-text text-muted">
                    Our mission is to simplify travel planning by providing
                    reliable insights and smart tools that help travelers make
                    confident decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h2 className="fw-bold mb-3">Why Choose Easy Trip Planner?</h2>
              <p className="text-muted">
                We focus on simplicity, accuracy, and user experience to make
                travel planning stress-free and enjoyable.
              </p>
              <ul className="text-muted">
                <li>User-friendly interface</li>
                <li>Accurate travel insights</li>
                <li>Modern and scalable design</li>
              </ul>
            </div>

            <div className="col-md-6 text-center">
              <img
                src="/aboutusimg.png"
                alt="Travel illustration"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}



