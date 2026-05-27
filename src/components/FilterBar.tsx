import React, { useState } from 'react';
import '../styles/components/FilterBar.scss';

interface FilterBarProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  budget: { min: number; max: number };
  duration: number;
  intensity: 'low' | 'medium' | 'high';
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    budget: { min: 0, max: 5000 },
    duration: 7,
    intensity: 'medium',
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div className="filter-bar">
      <div className="filter-item">
        <label>Budżet: {filters.budget.min} - {filters.budget.max} PLN</label>
        <input
          type="range"
          min="0"
          max="10000"
          value={filters.budget.max}
          onChange={(e) =>
            handleFilterChange({
              ...filters,
              budget: { ...filters.budget, max: parseInt(e.target.value) },
            })
          }
        />
      </div>

      <div className="filter-item">
        <label>Czas trwania: {filters.duration} dni</label>
        <input
          type="range"
          min="1"
          max="30"
          value={filters.duration}
          onChange={(e) =>
            handleFilterChange({ ...filters, duration: parseInt(e.target.value) })
          }
        />
      </div>

      <div className="filter-item">
        <label>Intensywność</label>
        <select
          value={filters.intensity}
          onChange={(e) =>
            handleFilterChange({
              ...filters,
              intensity: e.target.value as 'low' | 'medium' | 'high',
            })
          }
        >
          <option value="low">Relaksacyjna</option>
          <option value="medium">Umiarkowana</option>
          <option value="high">Ekstremalnie aktywna</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
