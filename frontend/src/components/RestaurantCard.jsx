import React from 'react';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  return (
    <div
      style={styles.card}
      onClick={() => navigate(`/food-partner/${restaurant._id}`)}
    >
      <img src={restaurant.image} alt={restaurant.name} style={styles.image} />
      <div style={styles.info}>
        <h4>{restaurant.name}</h4>
        <p>⭐ {restaurant.rating} • {restaurant.time}</p>
      </div>
    </div>
  );
};

const styles = {
  card: { borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  image: { width: '100%', height: '160px', objectFit: 'cover' },
  info: { padding: '10px' },
};

export default RestaurantCard;
