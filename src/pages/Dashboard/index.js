import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

export default function Dashboard() {
  const [spots, setSpots] = useState([]);
  
  useEffect(() => {
    const user_id = localStorage.getItem('user');
    api.get('/dashboard', {
      headers: { user_id }
    }).then( response => {
      setSpots(response.data);
    });
  }, []);
  
  return (
    <>
      <ul className="spot-list">
        {spots.map(spots => (
          <li key={spots._id}>
            <header style={{backgroundImage: `url(${spots.thumbnail_url})`}}></header>
            <strong>{spots.company}</strong>
            <span>{spots.price ? `R$ ${spots.price}/dia` : "Gratuito"}</span>
          </li>
        ))}
      </ul>

      <Link to="/new">
        <button className="btn">Cadastrar novo spot</button>
      </Link>
    </>
  );
}
