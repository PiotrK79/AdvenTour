import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useGroup } from '../context/GroupContext';
import Button from '../components/ui/Button';
import PageHeader from '../components/ui/PageHeader';
import Panel from '../components/ui/Panel';
import TextInput from '../components/ui/TextInput';
import '../styles/pages/Home.scss';

const createGroupCode = () =>
  Math.random().toString(36).slice(2, 8).toUpperCase();

const Home: React.FC = () => {
  const navigate = useNavigate();
  const {
    groupName: savedGroupName,
    setGroupId,
    setGroupName: setContextGroupName,
    setMembers,
    setCurrentStep,
  } = useGroup();
  const [groupName, setGroupName] = useState(savedGroupName);
  const [joinCode, setJoinCode] = useState('');
  const [mode, setMode] = useState<'create' | 'join' | null>(null);
  const [error, setError] = useState('');

  const handleCreateGroup = () => {
    const trimmedName = groupName.trim();
    if (!trimmedName) {
      setError('Wpisz nazwę grupy, żeby przejść dalej.');
      return;
    }

    setGroupId(createGroupCode());
    setContextGroupName(trimmedName);
    setMembers([{ id: 'you', name: 'Ty' }]);
    setCurrentStep('setup');
    navigate('/setup');
  };

  const handleJoinGroup = () => {
    const trimmedCode = joinCode.trim().toUpperCase();
    if (!trimmedCode) {
      setError('Wpisz kod zaproszenia.');
      return;
    }

    setGroupId(trimmedCode);
    setContextGroupName(`Grupa #${trimmedCode}`);
    setMembers([{ id: 'you', name: 'Ty' }]);
    setCurrentStep('setup');
    navigate('/setup');
  };

  const chooseMode = (nextMode: 'create' | 'join') => {
    setError('');
    setMode(nextMode);
  };

  return (
    <>
      <Navbar currentStep="Strona główna" groupName={savedGroupName} />
      <div className="home-container">
        <PageHeader
          eyebrow="Planowanie grupowe"
          title="Witaj w AdvenTour"
          description="Zaplanuj idealny wyjazd bez niekończących się ankiet. Ustalcie preferencje, swipe'ujcie propozycje i zbierzcie wspólny plan."
        />

        {!mode ? (
          <div className="mode-selection">
            <Panel className="mode-card" tone="highlight">
              <span>Start</span>
              <h3>Utwórz grupę</h3>
              <p>Załóż nowy wyjazd, zaproś znajomych i zbierzcie wspólne preferencje.</p>
              <Button onClick={() => chooseMode('create')}>Utwórz nową grupę</Button>
            </Panel>
            <Panel className="mode-card">
              <span>Kod</span>
              <h3>Dołącz do grupy</h3>
              <p>Masz już zaproszenie? Wpisz kod i przejdź od razu do planowania.</p>
              <Button variant="secondary" onClick={() => chooseMode('join')}>
                Dołącz do grupy
              </Button>
            </Panel>
          </div>
        ) : mode === 'create' ? (
          <Panel className="form-section">
            <TextInput
              label="Nazwa grupy"
              name="groupName"
              placeholder="Nazwa grupy (np. Ekipa lata 2026)"
              value={groupName}
              error={error}
              onChange={(e) => {
                setError('');
                setGroupName(e.target.value);
              }}
            />
            <Button onClick={handleCreateGroup} disabled={!groupName.trim()} fullWidth>
              Utwórz
            </Button>
            <Button variant="secondary" onClick={() => setMode(null)} fullWidth>
              Wróć
            </Button>
          </Panel>
        ) : (
          <Panel className="form-section">
            <TextInput
              label="Kod zaproszenia"
              name="joinCode"
              placeholder="Kod zaproszenia"
              value={joinCode}
              error={error}
              onChange={(e) => {
                setError('');
                setJoinCode(e.target.value);
              }}
            />
            <Button onClick={handleJoinGroup} disabled={!joinCode.trim()} fullWidth>
              Dołącz
            </Button>
            <Button variant="secondary" onClick={() => setMode(null)} fullWidth>
              Wróć
            </Button>
          </Panel>
        )}

        <div className="home-steps" aria-label="Jak działa AdvenTour">
          {[
            ['01', 'Preferencje', 'Budżet, kierunek i tempo wyjazdu.'],
            ['02', 'Swipe', 'Każdy głosuje na propozycje, które mu pasują.'],
            ['03', 'Plan', 'Aplikacja zbiera najlepsze wybory w jeden widok.'],
          ].map(([step, title, description]) => (
            <Panel key={step} className="home-step">
              <strong>{step}</strong>
              <h3>{title}</h3>
              <p>{description}</p>
            </Panel>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
