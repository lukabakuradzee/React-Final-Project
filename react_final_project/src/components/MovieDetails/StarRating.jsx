import React, { useState, useEffect } from 'react';

const StarRating = ({ value: initialValue, onRate }) => {
  const [rating, setRating] = useState(initialValue);

  useEffect(() => {
    setRating(initialValue);
  }, [initialValue]);

  const handleRate = (newRating) => {
    setRating(newRating);
    onRate(newRating);
    localStorage.setItem('User Rating', newRating);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((index) => (
        <span
          className="user-rating"
          key={index}
          onClick={() => handleRate(index)}
          style={{
            cursor: 'pointer',
            color: index <= rating ? 'gold' : 'gray',
          }}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
