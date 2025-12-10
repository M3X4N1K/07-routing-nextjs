import axios from 'axios';

const API_URL = 'https://notehub.net.ua/api/notes';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Fetch list of notes
export async function fetchNotes(tag?: string) {
  try {
    const response = await api.get('', {
      params: tag ? { tag } : undefined,
    });
    return response.data;
  } catch (error: any) {
    console.error('fetchNotes error:', error);
    throw new Error('Не вдалося завантажити нотатки.');
  }
}

// Fetch single note
export async function fetchNoteById(id: string) {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('fetchNoteById error:', error);
    throw new Error('Не вдалося завантажити нотатку.');
  }
}

// >>> NEW: Create note
export async function createNote(payload: { title: string; content: string; tags?: string[] }) {
  try {
    const response = await api.post('', payload);
    return response.data;
  } catch (error: any) {
    console.error('createNote error:', error);
    throw new Error('Не вдалося створити нотатку.');
  }
}
import axios from 'axios';

const API_URL = 'https://notehub.net.ua/api/notes';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Fetch list of notes
export async function fetchNotes(tag?: string) {
  try {
    const response = await api.get('', {
      params: tag ? { tag } : undefined,
    });
    return response.data;
  } catch (error: any) {
    console.error('fetchNotes error:', error);
    throw new Error('Не вдалося завантажити нотатки.');
  }
}

// Fetch single note
export async function fetchNoteById(id: string) {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('fetchNoteById error:', error);
    throw new Error('Не вдалося завантажити нотатку.');
  }
}

// >>> NEW: Create note
export async function createNote(payload: { title: string; content: string; tags?: string[] }) {
  try {
    const response = await api.post('', payload);
    return response.data;
  } catch (error: any) {
    console.error('createNote error:', error);
    throw new Error('Не вдалося створити нотатку.');
  }
}
