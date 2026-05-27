import type { HTMLAttributes, ReactNode } from 'react';

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  tone?: 'default' | 'highlight';
}

const Panel = ({
  children,
  tone = 'default',
  className = '',
  ...props
}: PanelProps) => (
  <div className={['ui-panel', `ui-panel-${tone}`, className].filter(Boolean).join(' ')} {...props}>
    {children}
  </div>
);

export default Panel;
