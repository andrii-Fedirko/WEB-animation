interface HeaderProps {
  title: string;
  subtitle?: string;
  score?: number;
}

export function Header({ title, subtitle, score }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <h1>{title}</h1>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </div>
      {score !== undefined && (
        <div className="score-badge">
          Бали: <span>{score}</span>
        </div>
      )}
    </header>
  );
}