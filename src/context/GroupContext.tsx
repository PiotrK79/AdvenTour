import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface Member {
  id: string;
  name: string;
  avatar?: string;
}

interface GroupContextType {
  groupId: string | null;
  groupName: string;
  members: Member[];
  currentStep: 'home' | 'setup' | 'swipe' | 'final';
  filters: {
    budget: { min: number; max: number };
    duration: number;
    intensity: 'low' | 'medium' | 'high';
    destination: string;
  };
  matches: string[];
  setGroupId: (id: string) => void;
  setGroupName: (name: string) => void;
  setMembers: (members: Member[]) => void;
  setCurrentStep: (step: 'home' | 'setup' | 'swipe' | 'final') => void;
  setFilters: (filters: any) => void;
  addMatch: (destinationId: string) => void;
  removeMatch: (destinationId: string) => void;
  resetGroup: () => void;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

interface GroupProviderProps {
  children: ReactNode;
}

export const GroupProvider: React.FC<GroupProviderProps> = ({ children }) => {
  const [groupId, setGroupId] = useState<string | null>(null);
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  const [currentStep, setCurrentStep] = useState<'home' | 'setup' | 'swipe' | 'final'>('home');
  const [filters, setFilters] = useState({
    budget: { min: 0, max: 5000 },
    duration: 7,
    intensity: 'medium' as const,
    destination: '',
  });
  const [matches, setMatches] = useState<string[]>([]);

  const addMatch = (destinationId: string) => {
    setMatches((prev) =>
      prev.includes(destinationId) ? prev : [...prev, destinationId]
    );
  };

  const removeMatch = (destinationId: string) => {
    setMatches((prev) => prev.filter((id) => id !== destinationId));
  };

  const resetGroup = () => {
    setGroupId(null);
    setGroupName('');
    setMembers([]);
    setCurrentStep('home');
    setMatches([]);
  };

  const value: GroupContextType = {
    groupId,
    groupName,
    members,
    currentStep,
    filters,
    matches,
    setGroupId,
    setGroupName,
    setMembers,
    setCurrentStep,
    setFilters,
    addMatch,
    removeMatch,
    resetGroup,
  };

  return (
    <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
  );
};

export const useGroup = (): GroupContextType => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error('useGroup musi być używany wewnątrz GroupProvider');
  }
  return context;
};

export default GroupContext;
