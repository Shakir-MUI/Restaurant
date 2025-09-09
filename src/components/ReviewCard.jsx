import React from "react";

export default function ReviewCard({ name, review, rating }) {
  return (
    <div className="card shadow-sm border-0 rounded-4 p-3 h-100">
      <div className="card-body">
        <h5 className="fw-bold">{name}</h5>
        <p className="text-muted mb-2">"{review}"</p>
        <p className="text-warning mb-0">
          {"⭐".repeat(rating)}{"☆".repeat(5 - rating)}
        </p>
      </div>
    </div>
  );
}
