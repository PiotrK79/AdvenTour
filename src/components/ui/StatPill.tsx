interface StatPillProps {
  label: string;
  value: string | number;
}

const StatPill = ({ label, value }: StatPillProps) => (
  <span className="stat-pill">
    <span>{label}</span>
    <strong>{value}</strong>
  </span>
);

export default StatPill;
