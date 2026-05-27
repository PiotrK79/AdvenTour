import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
import { useGroup } from '../context/GroupContext';
import Button from '../components/ui/Button';
import PageHeader from '../components/ui/PageHeader';
import Panel from '../components/ui/Panel';
import TextInput from '../components/ui/TextInput';
import '../styles/pages/Setup.scss';

interface FilterState {
  budget: { min: number; max: number };
  duration: number;
  intensity: 'low' | 'medium' | 'high';
}

const intensityLabels = {
  low: 'Relaks',
  medium: 'Balans',
  high: 'Aktywnie',
};

const Setup: React.FC = () => {
  const navigate = useNavigate();
  const {
    filters: savedFilters,
    groupName,
    setCurrentStep,
    setFilters: setContextFilters,
  } = useGroup();
  const [filters, setFilters] = useState<FilterState>({
    budget: savedFilters.budget,
    duration: savedFilters.duration,
    intensity: savedFilters.intensity,
  });
  const [destination, setDestination] = useState(savedFilters.destination);
  const [error, setError] = useState('');

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleContinue = () => {
    const trimmedDestination = destination.trim();
    if (!trimmedDestination) {
      setError('Wpisz cel podróży, żeby zobaczyć propozycje.');
      return;
    }

    setContextFilters({ ...filters, destination: trimmedDestination });
    setCurrentStep('swipe');
    navigate('/swipe');
  };

  return (
    <>
      <Navbar currentStep="Ustawienia" groupName={groupName} />
      <div className="setup-container">
        <PageHeader
          eyebrow="Krok 1"
          title="Skonfiguruj preferencje"
          description="Wybierz kierunek i ramy wyjazdu. Te dane posłużą później do lepszego dopasowania propozycji."
        />

        <div className="setup-grid">
          <div className="setup-main">
            <Panel className="setup-section">
              <TextInput
                label="Dokąd chcesz pojechać?"
                name="destination"
                type="text"
                placeholder="Nazwa kraju, miasta lub regionu"
                value={destination}
                error={error}
                onChange={(e) => {
                  setError('');
                  setDestination(e.target.value);
                }}
                className="destination-input"
              />
            </Panel>

            <FilterBar initialFilters={filters} onFilterChange={handleFilterChange} />
          </div>

          <Panel className="preferences-summary">
            <span className="summary-label">Podsumowanie</span>
            <h3>Twoje preferencje</h3>
            <ul>
              <li><span>Cel</span><strong>{destination || 'Nie wybrano'}</strong></li>
              <li><span>Budżet</span><strong>{filters.budget.min} - {filters.budget.max} PLN</strong></li>
              <li><span>Czas</span><strong>{filters.duration} dni</strong></li>
              <li><span>Tempo</span><strong>{intensityLabels[filters.intensity]}</strong></li>
            </ul>
            <div className="setup-actions">
              <Button onClick={handleContinue} disabled={!destination.trim()} fullWidth>
                Przejdź do przewijania kart
              </Button>
              <Button variant="secondary" onClick={() => navigate('/')} fullWidth>
                Wróć
              </Button>
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
};

export default Setup;
