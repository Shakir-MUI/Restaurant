import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewCard from "../components/ReviewCard";

const BASE_URL = "https://e-commerce-77db0-default-rtdb.firebaseio.com";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: "", review: "", rating: 5 });

  // Fetch reviews from Firebase
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/reviews.json`);
        if (data) {
          const arr = Object.values(data);
          setReviews(arr);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.review.trim()) {
      alert("⚠️ Please fill in all fields");
      return;
    }

    const newReview = {
      name: form.name,
      review: form.review,
      rating: Number(form.rating),
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post(`${BASE_URL}/reviews.json`, newReview);
      setReviews([...reviews, newReview]);
      alert("✅ Review submitted successfully!");
      setForm({ name: "", review: "", rating: 5 });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit review. Try again.");
    }
  };

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 40%, #06b6d4 100%)",
      }}
    >
      <div className="container">
        <h1 className="fw-bold text-center text-white mb-4">⭐ Customer Reviews</h1>

        {/* Review Form */}
        <div className="card shadow-lg border-0 rounded-4 p-4 mb-5 mx-auto" style={{ maxWidth: "600px" }}>
          <h4 className="fw-semibold mb-3">Write a Review</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Your Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Your Review</label>
              <textarea
                name="review"
                rows="3"
                className="form-control"
                placeholder="Share your experience..."
                value={form.review}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Rating</label>
              <select
                name="rating"
                className="form-select"
                value={form.rating}
                onChange={handleChange}
              >
                <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                <option value="4">⭐⭐⭐⭐ (4)</option>
                <option value="3">⭐⭐⭐ (3)</option>
                <option value="2">⭐⭐ (2)</option>
                <option value="1">⭐ (1)</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-100 fw-semibold">
              Submit Review
            </button>
          </form>
        </div>

        {/* Review List */}
        <div className="row g-4">
          {reviews.length > 0 ? (
            reviews.map((rev, i) => (
              <div className="col-12 col-md-6 col-lg-4" key={i}>
                <ReviewCard name={rev.name} review={rev.review} rating={rev.rating} />
              </div>
            ))
          ) : (
            <p className="text-center text-white-50">No reviews yet. Be the first!</p>
          )}
        </div>
      </div>
    </div>
  );
}
