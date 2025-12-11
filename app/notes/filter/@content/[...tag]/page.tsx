'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './page.module.css';

const PER_PAGE = 12;

export default function FilteredNotesPage() {
  const params = useParams();
  const tag = params.tag?.[0];
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryTag = tag === 'all' ? undefined : tag;

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', page, search, queryTag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search: search || undefined,
        tag: queryTag,
      }),
  });

  const notes = data?.notes ?? [];

  // 🔥 ВИПРАВЛЕНО — рахуємо totalPages з total / perPage
  const totalPages = data ? Math.ceil(data.total / data.perPage) : 0;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  if (isLoading) return <p>Loading notes...</p>;
  if (error) return <p>Error loading notes</p>;

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />

        {totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        )}

        <button
          type="button"
          className={css.button}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </div>

      <NoteList notes={notes} />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
