import { ReactNode } from "react";

interface SlugLayoutProps {
  children: ReactNode;
}

export default function SlugLayout({ children }: SlugLayoutProps) {
  // Прокладка для маршруту [...slug]
  return <>{children}</>;
}
