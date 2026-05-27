import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import GroupInfo from '../components/GroupInfo';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import PageHeader from '../components/ui/PageHeader';
import Panel from '../components/ui/Panel';
import { useGroup } from '../context/GroupContext';
import { destinations } from '../data/destinations';
import '../styles/pages/FinalPlan.scss';

const FinalPlan: React.FC = () => {
  const navigate = useNavigate();
  const {
    filters,
    groupId,
    groupName,
    matches,
    members,
    resetGroup,
  } = useGroup();
  const selectedDestinations = destinations.filter((destination) =>
    matches.includes(destination.id)
  );
  const groupMembers = members.length > 0 ? members : [{ id: 'you', name: 'Ty' }];

  const handleReset = () => {
    resetGroup();
    navigate('/');
  };

  return (
    <>
      <Navbar currentStep="Plan podróży" groupName={groupName} />
      <div className="final-plan-container">
        <PageHeader
          eyebrow="Krok 3"
          title="Twój ostateczny plan podróży"
          description="Zebraliśmy polubione propozycje w jeden czytelny plan, gotowy do dalszego dopracowania z grupą."
        />

        {selectedDestinations.length > 0 ? (
          <>
            <div className="plan-grid">
              <Panel className="plan-section itinerary">
                <h3>Wybrane miejsca</h3>
                {selectedDestinations.map((destination, index) => (
                  <div key={destination.id} className="itinerary-item">
                    <div className="day-header">
                      <strong>Etap {index + 1}</strong>
                      <span className="location">{destination.title}</span>
                    </div>
                    <p>{destination.description}</p>
                    <ul>
                      <li>Czas: {destination.duration}</li>
                      <li>Szacowany koszt: {destination.price} PLN</li>
                      <li>Charakter wyjazdu: {destination.vibe}</li>
                    </ul>
                  </div>
                ))}
              </Panel>

              <div className="plan-sidebar">
                <GroupInfo
                  groupName={groupName || 'Twoja grupa'}
                  groupId={groupId || 'BRAK-ID'}
                  members={groupMembers}
                />

                <Panel className="trip-summary">
                  <span className="summary-label">Preferencje</span>
                  <h3>{filters.destination || 'Wybrany kierunek'}</h3>
                  <ul>
                    <li><span>Budżet</span><strong>{filters.budget.min} - {filters.budget.max} PLN</strong></li>
                    <li><span>Czas</span><strong>{filters.duration} dni</strong></li>
                    <li><span>Liczba wyborów</span><strong>{selectedDestinations.length}</strong></li>
                  </ul>
                </Panel>
              </div>
            </div>

            <div className="plan-actions">
              <Button>Udostępnij plan</Button>
              <Button variant="secondary">Pobierz PDF</Button>
              <Button variant="secondary" onClick={() => navigate('/setup')}>
                Edytuj preferencje
              </Button>
              <Button variant="ghost" onClick={handleReset}>
                Zacznij od nowa
              </Button>
            </div>

            <div className="map-placeholder">
              <p>Mapa trasy będzie wyświetlana tutaj po podłączeniu backendu i geolokalizacji.</p>
            </div>
          </>
        ) : (
          <EmptyState
            title="Nie masz jeszcze polubionych miejsc"
            description="Wróć do kart i wybierz propozycje, które pasują grupie."
            action={
              <Button onClick={() => navigate('/swipe')}>
                Wróć do wyboru kart
              </Button>
            }
          />
        )}
      </div>
    </>
  );
};

export default FinalPlan;
