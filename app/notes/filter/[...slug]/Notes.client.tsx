'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';

interface NotesProps {
  tag?: string;
}

const PER_PAGE = 12;

export default function Notes({ tag }: NotesProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const queryTag = tag === 'all' ? undefined : tag;

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', page, search, queryTag],
    queryFn: () =>
      fetchNotes({ page, perPage: PER_PAGE, search: search || undefined, tag: queryTag }),
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  if (isLoading) return <p>Loading notes...</p>;
  if (error) return <p>Error loading notes</p>;

  return (
    <div>
      <SearchBox value={search} onChange={handleSearchChange} />
      <NoteList notes={notes} />
      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} onChange={setPage} />}
    </div>
  );
}
