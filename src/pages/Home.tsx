import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useGroup } from '../context/GroupContext';
import '../styles/pages/Home.scss';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { setGroupName: setContextGroupName } = useGroup();
  const [groupName, setGroupName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [mode, setMode] = useState<'create' | 'join' | null>(null);

  const handleCreateGroup = () => {
    if (groupName.trim()) {
      setContextGroupName(groupName);
      navigate('/setup');
    }
  };

  const handleJoinGroup = () => {
    if (joinCode.trim()) {
      setContextGroupName(`Grupa #${joinCode}`);
      navigate('/setup');
    }
  };

  return (
    <>
      <Navbar currentStep="Strona główna" />
      <div className="home-container">
        <h2>Witaj w AdvenTour</h2>
        <p>Zaplanuj idealne wakacje razem ze swoją grupą</p>

        {!mode ? (
          <div className="mode-selection">
            <button
              className="btn btn-primary"
              onClick={() => setMode('create')}
            >
              Utwórz nową grupę
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setMode('join')}
            >
              Dołącz do grupy
            </button>
          </div>
        ) : mode === 'create' ? (
          <div className="form-section">
            <input
              type="text"
              placeholder="Nazwa grupy (np. Ekipa lata 2026)"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleCreateGroup}>
              Utwórz
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setMode(null)}
            >
              Wróć
            </button>
          </div>
        ) : (
          <div className="form-section">
            <input
              type="text"
              placeholder="Kod zaproszenia"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleJoinGroup}>
              Dołącz
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setMode(null)}
            >
              Wróć
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
