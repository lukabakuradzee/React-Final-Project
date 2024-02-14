import React, { useState } from 'react';

const StarRating = ({ onRate }) => {
  const [rating, setRating] = useState(0);

  const handleRate = (newRating) => {
    setRating(newRating);
    // Call the onRate callback to pass the rating to the parent component
    onRate(newRating);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((index) => (
        <span className='user-rating'
          key={index}
          onClick={() => handleRate(index)}
          style={{ cursor: 'pointer', color: index <= rating ? 'gold' : 'gray' }}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
