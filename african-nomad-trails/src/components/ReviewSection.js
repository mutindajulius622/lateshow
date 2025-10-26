import React, { useState } from 'react';

const ReviewSection = ({ destination, reviews = [] }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    author: ''
  });

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 'No reviews yet';

  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log('New review:', newReview);
    setShowReviewForm(false);
    setNewReview({ rating: 5, comment: '', author: '' });
    alert('Review submitted successfully!');
  };

  return (
    <div className="review-section">
      <div className="review-header">
        <h3>Guest Reviews</h3>
        <div className="average-rating">
          ⭐ {averageRating} ({reviews.length} reviews)
        </div>
        <button 
          className="add-review-btn"
          onClick={() => setShowReviewForm(true)}
        >
          Write a Review
        </button>
      </div>

      {showReviewForm && (
        <form className="review-form" onSubmit={handleSubmitReview}>
          <h4>Write Your Review</h4>
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              value={newReview.author}
              onChange={(e) => setNewReview(prev => ({
                ...prev, author: e.target.value
              }))}
              required
            />
          </div>
          <div className="form-group">
            <label>Rating</label>
            <select
              value={newReview.rating}
              onChange={(e) => setNewReview(prev => ({
                ...prev, rating: parseInt(e.target.value)
              }))}
            >
              {[5,4,3,2,1].map(rating => (
                <option key={rating} value={rating}>
                  {'⭐'.repeat(rating)} ({rating}/5)
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Your Review</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview(prev => ({
                ...prev, comment: e.target.value
              }))}
              required
              rows="4"
            />
          </div>
          <div className="form-actions">
            <button type="button" onClick={() => setShowReviewForm(false)}>
              Cancel
            </button>
            <button type="submit">Submit Review</button>
          </div>
        </form>
      )}

      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <strong>{review.author}</strong>
                <span className="review-rating">⭐ {review.rating}/5</span>
              </div>
              <p className="review-comment">{review.comment}</p>
              <small className="review-date">{review.date}</small>
            </div>
          ))
        ) : (
          <p>Be the first to review this destination!</p>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;