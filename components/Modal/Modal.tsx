'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import css from './Modal.module.css';

interface ModalProps {
  children: ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter();

  useEffect(() => {
    // Блокуємо скрол body
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    router.back(); // Повертаємось назад
  };

  return (
    <div className={css.overlay} onClick={handleClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={handleClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}