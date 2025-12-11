import { ReactNode } from 'react';
import css from './layout.module.css';

interface FilterLayoutProps {
  sidebar: ReactNode;
  content: ReactNode;
  children: ReactNode;
}

export default function FilterLayout({
  sidebar,
  content,
  children,
}: FilterLayoutProps) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.notesWrapper}>{content || children}</main>
    </div>
  );
}