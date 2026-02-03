import React, { useState } from "react";

export default function Feedback() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
    comments: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Validation rules
  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Email is invalid.";
    }
    if (!formData.rating) errors.rating = "Please select a rating.";
    // Comments are optional
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    // Simulate async submit
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        rating: "",
        comments: "",
      });
      setErrors({});
    }, 1500);
  };

  return (
    <div className="container my-5" style={{ maxWidth: "600px" }}>
      <h1 className="mb-4 text-center fw-bold">We Value Your Feedback</h1>

      {submitted && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>Thank you!</strong> Your feedback has been received.
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setSubmitted(false)}
          ></button>
        </div>
      )}

      <form noValidate onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label fw-semibold">
            Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="name"
            name="name"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
            aria-describedby="nameHelp"
            aria-invalid={!!errors.name}
            required
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name}</div>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-semibold">
            Email <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
            name="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            aria-describedby="emailHelp"
            aria-invalid={!!errors.email}
            required
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        {/* Rating */}
        <div className="mb-3">
          <label htmlFor="rating" className="form-label fw-semibold">
            Rating <span className="text-danger">*</span>
          </label>
          <select
            className={`form-select ${errors.rating ? "is-invalid" : ""}`}
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            aria-invalid={!!errors.rating}
            required
          >
            <option value="" disabled>
              -- Select Rating --
            </option>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Fair</option>
            <option value="1">1 - Poor</option>
          </select>
          {errors.rating && (
            <div className="invalid-feedback">{errors.rating}</div>
          )}
        </div>

        {/* Comments */}
        <div className="mb-4">
          <label htmlFor="comments" className="form-label fw-semibold">
            Comments
          </label>
          <textarea
            className="form-control"
            id="comments"
            name="comments"
            rows="4"
            placeholder="Write your suggestions or experience (optional)..."
            value={formData.comments}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
          aria-live="polite"
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Submitting...
            </>
          ) : (
            "Submit Feedback"
          )}
        </button>
      </form>
    </div>
  );
}
