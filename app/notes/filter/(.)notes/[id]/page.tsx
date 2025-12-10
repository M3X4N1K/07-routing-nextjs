'use client';

import { useParams } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import NoteDetailsClient from '@/app/notes/[id]/NoteDetails.client';
import css from './page.module.css';

export default function NotePreviewModal() {
  const { id } = useParams();

  if (!id) {
    return (
      <Modal>
        <p>Note not found</p>
      </Modal>
    );
  }

  return (
    <Modal>
      <div className={css.container}>
        {/* Передаємо id як пропс у NoteDetailsClient */}
        <NoteDetailsClient noteId={id} />
      </div>
    </Modal>
  );
}
