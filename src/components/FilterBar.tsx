import React, { useState } from 'react';
import SegmentedControl from './ui/SegmentedControl';
import '../styles/components/FilterBar.scss';

interface FilterState {
  budget: { min: number; max: number };
  duration: number;
  intensity: 'low' | 'medium' | 'high';
}

interface FilterBarProps {
  initialFilters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
}

const defaultFilters: FilterState = {
  budget: { min: 0, max: 5000 },
  duration: 7,
  intensity: 'medium',
};

const FilterBar: React.FC<FilterBarProps> = ({
  initialFilters = defaultFilters,
  onFilterChange,
}) => {
  const [filters, setFilters] = useState<FilterState>({
    ...initialFilters,
    budget: { ...initialFilters.budget },
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
        <SegmentedControl
          label="Intensywność"
          value={filters.intensity}
          options={[
            { label: 'Relaks', value: 'low' },
            { label: 'Balans', value: 'medium' },
            { label: 'Aktywnie', value: 'high' },
          ]}
          onChange={(intensity) =>
            handleFilterChange({
              ...filters,
              intensity,
            })
          }
        />
      </div>
    </div>
  );
};

export default FilterBar;
