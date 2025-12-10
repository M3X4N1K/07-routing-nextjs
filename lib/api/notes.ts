import axios from 'axios';

const API_URL = 'https://notehub.net.ua/api/notes';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

// Створюємо окремий інстанс axios — це правильно для Next.js
const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Fetch list of notes (optionally filtered by tag)
export async function fetchNotes(tag?: string) {
  try {
    const response = await api.get('', {
      params: tag ? { tag } : undefined,
    });
    return response.data;
  } catch (error: any) {
    console.error('fetchNotes error:', error?.response?.data || error);
    throw new Error('Не вдалося завантажити нотатки.');
  }
}

// Fetch single note by ID
export async function fetchNoteById(id: string) {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('fetchNoteById error:', error?.response?.data || error);
    throw new Error('Не вдалося завантажити нотатку.');
  }
}

// TODO: інші функції, наприклад createNote, updateNote, deleteNote...
