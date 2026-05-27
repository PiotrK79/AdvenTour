interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

const PageHeader = ({ eyebrow, title, description }: PageHeaderProps) => (
  <header className="page-header">
    {eyebrow && <span className="page-header__eyebrow">{eyebrow}</span>}
    <h2>{title}</h2>
    {description && <p>{description}</p>}
  </header>
);

export default PageHeader;
