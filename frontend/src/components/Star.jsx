import React, { useState } from "react";

const Star = ({ totalStars = 5, n }) => {
  const [rating, setRating] = useState(n);

  const handleClick = (index) => {
    setRating(index + 1); // Set rating based on index (0-based)
  };

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleClick(index)}
          style={{
            cursor: "pointer",
            color: index < rating ? "#FFD700" : "#ccc",
            fontSize: "30px",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Star;
