'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';

export default function NotePreview() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const handleClose = () => router.back();

  if (isLoading) {
    return <Modal onClose={handleClose}>Loading...</Modal>;
  }

  if (error || !note) {
    return <Modal onClose={handleClose}>Note not found</Modal>;
  }

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <h2>{note.title}</h2>
        {note.tag && <span className={css.tag}>{note.tag}</span>}
        <p>{note.content}</p>
        <p className={css.date}>
          {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Modal>
  );
}
