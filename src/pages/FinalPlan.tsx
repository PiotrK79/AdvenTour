import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import GroupInfo from '../components/GroupInfo';
import '../styles/pages/FinalPlan.scss';

interface ItineraryItem {
  day: number;
  activities: string[];
  location: string;
}

interface Member {
  id: string;
  name: string;
  avatar?: string;
}

const FinalPlan: React.FC = () => {
  const navigate = useNavigate();
  const [itinerary] = useState<ItineraryItem[]>([
    {
      day: 1,
      location: 'Kraków',
      activities: [
        'Przyjazd',
        'Check-in do hotelu',
        'Spacer po Rynku Głównym',
      ],
    },
    {
      day: 2,
      location: 'Kraków',
      activities: ['Wawel', 'Muzea', 'Wieczorna kolacja'],
    },
    {
      day: 3,
      location: 'Bałtyk',
      activities: ['Wyjazd nad Bałtyk', 'Plaża', 'Spacer po brzegu'],
    },
  ]);

  const [groupMembers] = useState<Member[]>([
    { id: '1', name: 'Jan' },
    { id: '2', name: 'Maria' },
    { id: '3', name: 'Piotr' },
  ]);

  return (
    <>
      <Navbar currentStep="Plan podróży" />
      <div className="final-plan-container">
        <h2>Twój ostateczny plan podróży</h2>

        <div className="plan-grid">
          <div className="plan-section itinerary">
            <h3>Itinerarium</h3>
            {itinerary.map((item) => (
              <div key={item.day} className="itinerary-item">
                <div className="day-header">
                  <strong>Dzień {item.day}</strong>
                  <span className="location">{item.location}</span>
                </div>
                <ul>
                  {item.activities.map((activity, idx) => (
                    <li key={idx}>{activity}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="plan-section group">
            <GroupInfo
              groupName="Ekipa Lata 2026"
              groupId="GROUP123"
              members={groupMembers}
            />
          </div>
        </div>

        <div className="plan-actions">
          <button className="btn btn-primary">Udostępnij plan</button>
          <button className="btn btn-secondary">Pobierz PDF</button>
          <button className="btn btn-secondary">Edytuj plan</button>
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            Powrót do strony głównej
          </button>
        </div>

        <div className="map-placeholder">
          <p>Mapa trasy będzie wyświetlana tutaj</p>
        </div>
      </div>
    </>
  );
};

export default FinalPlan;
