import React from 'react';
import '../styles/components/SwipeCard.scss';

interface SwipeCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  rating?: number;
  price?: number;
}

const SwipeCard: React.FC<SwipeCardProps> = ({
  title,
  description,
  image,
  rating,
  price,
}) => {
  return (
    <div className="swipe-card">
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      <div className="card-content">
        <h2>{title}</h2>
        <p>{description}</p>
        {rating && <span className="rating">Ocena {rating}</span>}
        {price && <span className="price">{price} PLN</span>}
      </div>
    </div>
  );
};

export default SwipeCard;
