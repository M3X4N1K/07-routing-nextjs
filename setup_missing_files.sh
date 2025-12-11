#!/bin/bash

echo "🔹 Створюємо відсутні директорії та файли..."

# -----------------------------
# Створюємо папки
# -----------------------------
mkdir -p app/notes/filter/@sidebar
mkdir -p "app/notes/filter/@modal/(.)notes/[id]"
mkdir -p app/notes/filter/[...slug]

# -----------------------------
# Створюємо файли з готовим кодом
# -----------------------------

# default.tsx для @modal
cat > app/notes/filter/@modal/default.tsx << 'EOF'
export default function Default() {
  return null;
}
EOF

# layout.tsx для filter
cat > app/notes/filter/layout.tsx << 'EOF'
'use client';
import { ReactNode } from 'react';
import css from './layout.module.css';

interface FilterLayoutProps {
  sidebar: ReactNode;
  modal: ReactNode;
  children: ReactNode;
}

export default function FilterLayout({ sidebar, modal, children }: FilterLayoutProps) {
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
EOF

# layout.tsx для [...slug]
cat > app/notes/filter/[...slug]/layout.tsx << 'EOF'
'use client';
import { ReactNode } from 'react';
import css from './layout.module.css';

interface SlugLayoutProps {
  children: ReactNode;
}

export default function SlugLayout({ children }: SlugLayoutProps) {
  return <div className={css.container}>{children}</div>;
}
EOF

echo "✅ Структура папок та файли створені з готовим кодом."
