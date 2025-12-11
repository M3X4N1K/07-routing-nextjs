import { ReactNode } from "react";

interface SlugLayoutProps {
  children: ReactNode;
}

export default function SlugLayout({ children }: SlugLayoutProps) {
  return <>{children}</>;
}
