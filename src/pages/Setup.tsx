import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
import { useGroup } from '../context/GroupContext';
import '../styles/pages/Setup.scss';

interface FilterState {
  budget: { min: number; max: number };
  duration: number;
  intensity: 'low' | 'medium' | 'high';
}

const Setup: React.FC = () => {
  const navigate = useNavigate();
  const { setFilters: setContextFilters } = useGroup();
  const [filters, setFilters] = useState<FilterState>({
    budget: { min: 0, max: 5000 },
    duration: 7,
    intensity: 'medium',
  });

  const [destination, setDestination] = useState('');

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleContinue = () => {
    if (destination.trim()) {
      setContextFilters({ ...filters, destination });
      navigate('/swipe');
    }
  };

  return (
    <>
      <Navbar currentStep="Ustawienia" />
      <div className="setup-container">
        <h2>Skonfiguruj swoje preferencje</h2>

        <div className="setup-section">
          <label>Dokąd chcesz pojechać?</label>
          <input
            type="text"
            placeholder="Nazwa kraju, miasta lub regionu"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="destination-input"
          />
        </div>

        <FilterBar onFilterChange={handleFilterChange} />

        <div className="setup-actions">
          <button className="btn btn-primary" onClick={handleContinue}>
            Przejdź do przewijania kart
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            Wróć
          </button>
        </div>

        <div className="preferences-summary">
          <h3>Twoje preferencje:</h3>
          <ul>
            <li>Cel: {destination || '(nie wybrano)'}</li>
            <li>Budżet: {filters.budget.min} - {filters.budget.max} PLN</li>
            <li>Czas: {filters.duration} dni</li>
            <li>Intensywność: {filters.intensity}</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Setup;
