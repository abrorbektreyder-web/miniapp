import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export default function Layout({ children, className = '' }: LayoutProps) {
  return (
    <div className={`min-h-screen bg-tg-bg text-tg-text ${className}`}>
      <main className="safe-top safe-bottom">
        {children}
      </main>
    </div>
  );
}
