import axios from "axios";
import type { Note, NoteTag } from "../../types/note";

const API_URL = "https://notehub.net.ua/api/notes";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

// Додаємо токен в заголовки
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

// ---------- Типи ----------
export interface CreateNotePayload {
  title: string;
  content?: string;
  tag: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
}

// ---------- API Функції ----------

// Отримати всі нотатки + фільтр по тегу
export async function fetchNotes(tag?: string): Promise<FetchNotesResponse> {
  const params = tag ? { tag } : {};
  const response = await axios.get(API_URL, { params });
  return response.data;
}

// Отримати одну нотатку
export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}

// Створити нову нотатку
export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const response = await axios.post(API_URL, payload);
  return response.data;
}

// Видалити нотатку
export async function deleteNote(id: string): Promise<{ success: boolean }> {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}

// (при потребі можна додати updateNote)
