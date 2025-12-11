import { ReactNode } from 'react';
import css from './layout.module.css';

interface FilterLayoutProps {
  sidebar: ReactNode;
  modal: ReactNode;
  children: ReactNode;
}

export default function FilterLayout({
  sidebar,
  modal,
  children,
}: FilterLayoutProps) {
  return (
    <>
      <div className={css.container}>
        <aside className={css.sidebar}>{sidebar}</aside>
        <main className={css.notesWrapper}>{children}</main>
      </div>
      {modal}
    </>
  );
}
