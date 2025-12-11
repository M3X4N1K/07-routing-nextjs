import axios from "axios";
import type { Note, NoteTag } from "../../types/note";

// ==========================
//  CONFIG
// ==========================

// Використовуємо змінну середовища
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/notes";

// Токен (опційний)
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN ?? "";

// Створюємо axios-інстанс
const api = axios.create({
  baseURL: API_URL,
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});

// ==========================
//  Типи
// ==========================

export interface CreateNotePayload {
  title: string;
  content?: string;
  tag: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number; // ← ДОДАНО
}

// ==========================
//  API функції
// ==========================

// --- Отримати всі нотатки + фільтр
export async function fetchNotes(params?: {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}): Promise<FetchNotesResponse> {
  const { page = 1, perPage = 12, search, tag } = params || {};

  const response = await api.get("", {
    params: {
      page,
      perPage,
      ...(search && { search }),
      ...(tag && { tag }),
    },
  });

  // Якщо сервер не повертає totalPages, розрахуємо самі
  const total = response.data.total ?? 0;
  const totalPages =
    response.data.totalPages ?? Math.ceil(total / perPage);

  return {
    ...response.data,
    totalPages,
  };
}

// --- Отримати одну нотатку
export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get(`/${id}`);
  return response.data;
}

// --- Створити нотатку
export async function createNote(
  payload: CreateNotePayload
): Promise<Note> {
  const response = await api.post("", payload);
  return response.data;
}

// --- Видалити нотатку
export async function deleteNote(
  id: string
): Promise<{ success: boolean }> {
  const response = await api.delete(`/${id}`);
  return response.data;
}
