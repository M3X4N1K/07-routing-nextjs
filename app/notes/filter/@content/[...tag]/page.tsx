'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/notes';
import NoteList from '@/components/NoteList/NoteList';
import css from './page.module.css';

export default function FilteredNotesPage() {
  const params = useParams();
  const tag = params.tag?.[0]; // Отримуємо перший сегмент з catch-all

  // Якщо tag === 'all', не передаємо параметр tag в запит
  const { data: notes, isLoading, error } = useQuery({
    queryKey: ['notes', tag === 'all' ? undefined : tag],
    queryFn: () => fetchNotes(tag === 'all' ? undefined : tag),
  });

  if (isLoading) return <p>Loading notes...</p>;
  if (error) return <p>Error loading notes</p>;

  return (
    <div className={css.container}>
      <h2 className={css.title}>
        {tag === 'all' ? 'All Notes' : `Notes: ${tag}`}
      </h2>
      <NoteList notes={notes || []} />
    </div>
  );
}