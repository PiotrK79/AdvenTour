import React from 'react';
import '../styles/components/Navbar.scss';

interface NavbarProps {
  currentStep?: string;
  groupName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentStep, groupName }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>AdvenTour</h1>
      </div>
      <div className="navbar-center">
        {currentStep && <span className="step-indicator">{currentStep}</span>}
        {groupName && <span className="group-name">{groupName}</span>}
      </div>
      <div className="navbar-right">
        <button className="menu-btn" aria-label="Otwórz menu">☰</button>
      </div>
    </nav>
  );
};

export default Navbar;
