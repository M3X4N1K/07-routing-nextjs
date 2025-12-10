'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/notes';
import Modal from '@/components/Modal/Modal';
import css from './page.module.css';

export default function NotePreviewModal() {
  const params = useParams();
  const id = params.id as string;

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <Modal><p>Loading...</p></Modal>;
  if (error || !note) return <Modal><p>Note not found</p></Modal>;

  return (
    <Modal>
      <div className={css.container}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{new Date(note.createdAt).toLocaleDateString()}</p>
      </div>
    </Modal>
  );
}