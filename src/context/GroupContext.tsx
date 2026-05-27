import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

interface Member {
  id: string;
  name: string;
  avatar?: string;
}

export interface TravelFilters {
  budget: { min: number; max: number };
  duration: number;
  intensity: 'low' | 'medium' | 'high';
  destination: string;
}

interface GroupState {
  groupId: string | null;
  groupName: string;
  members: Member[];
  currentStep: 'home' | 'setup' | 'swipe' | 'final';
  filters: TravelFilters;
  matches: string[];
}

interface GroupContextType extends GroupState {
  setGroupId: (id: string | null) => void;
  setGroupName: (name: string) => void;
  setMembers: (members: Member[]) => void;
  setCurrentStep: (step: GroupState['currentStep']) => void;
  setFilters: (filters: TravelFilters) => void;
  addMatch: (destinationId: string) => void;
  removeMatch: (destinationId: string) => void;
  resetGroup: () => void;
}

const defaultFilters: TravelFilters = {
  budget: { min: 0, max: 5000 },
  duration: 7,
  intensity: 'medium',
  destination: '',
};

const defaultState: GroupState = {
  groupId: null,
  groupName: '',
  members: [],
  currentStep: 'home',
  filters: defaultFilters,
  matches: [],
};

const STORAGE_KEY = 'adventour:group-state';
const GroupContext = createContext<GroupContextType | undefined>(undefined);

interface GroupProviderProps {
  children: ReactNode;
}

const readStoredState = (): GroupState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...defaultState, ...JSON.parse(saved) } : defaultState;
  } catch {
    return defaultState;
  }
};

export const GroupProvider: React.FC<GroupProviderProps> = ({ children }) => {
  const [groupId, setGroupId] = useState<string | null>(() => readStoredState().groupId);
  const [groupName, setGroupName] = useState(() => readStoredState().groupName);
  const [members, setMembers] = useState<Member[]>(() => readStoredState().members);
  const [currentStep, setCurrentStep] = useState<GroupState['currentStep']>(
    () => readStoredState().currentStep
  );
  const [filters, setFilters] = useState<TravelFilters>(() => readStoredState().filters);
  const [matches, setMatches] = useState<string[]>(() => readStoredState().matches);

  useEffect(() => {
    const state: GroupState = {
      groupId,
      groupName,
      members,
      currentStep,
      filters,
      matches,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [currentStep, filters, groupId, groupName, matches, members]);

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
    setFilters(defaultFilters);
    setMatches([]);
    localStorage.removeItem(STORAGE_KEY);
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

// eslint-disable-next-line react-refresh/only-export-components
export const useGroup = (): GroupContextType => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error('useGroup musi być używany wewnątrz GroupProvider');
  }
  return context;
};

export default GroupContext;
