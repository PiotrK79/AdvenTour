import React from 'react';
import '../styles/components/SwipeCard.scss';

interface SwipeCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  rating?: number;
  price?: number;
  duration?: string;
  vibe?: string;
  tags?: string[];
}

const SwipeCard: React.FC<SwipeCardProps> = ({
  title,
  description,
  image,
  rating,
  price,
  duration,
  vibe,
  tags = [],
}) => {
  return (
    <div className="swipe-card">
      <div className="card-image">
        <img src={image} alt={title} />
        {vibe && <span className="card-vibe">{vibe}</span>}
      </div>
      <div className="card-content">
        <div>
          <h2>{title}</h2>
          {duration && <span className="card-duration">{duration}</span>}
        </div>
        <p>{description}</p>
        {tags.length > 0 && (
          <div className="card-tags">
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}
        <div className="card-meta">
          {rating && <span className="rating">Ocena {rating}</span>}
          {price && <span className="price">{price} PLN</span>}
        </div>
      </div>
    </div>
  );
};

export default SwipeCard;
