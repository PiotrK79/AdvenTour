import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

const EmptyState = ({ title, description, action }: EmptyStateProps) => (
  <div className="empty-state">
    <h2>{title}</h2>
    {description && <p>{description}</p>}
    {action}
  </div>
);

export default EmptyState;
