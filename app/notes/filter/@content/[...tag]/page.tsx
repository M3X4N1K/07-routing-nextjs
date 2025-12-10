'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/notes';
import NoteList from '@/components/NoteList/NoteList';
import css from './page.module.css';

export default function FilteredNotesPage() {
  const params = useParams();
  const tag = params.tag?.[0];

  const {
    data: notes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['notes', tag === 'all' ? undefined : tag],
    queryFn: () => fetchNotes(tag === 'all' ? undefined : tag),
  });

  if (isLoading) return <p>Loading notes...</p>;
  if (error) return <p>Error loading notes</p>;

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <h2>{tag === 'all' ? 'All Notes' : `Notes: ${tag}`}</h2>
      </div>
      <NoteList notes={notes || []} />
    </div>
  );
}
