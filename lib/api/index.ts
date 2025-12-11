import axios from "axios";
import type { Note, NoteTag } from "../../types/note";

// ==========================
// CONFIG (NoteHub API)
// ==========================

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://notehub.net.ua/api/notes";

const token =
  process.env.NEXT_PUBLIC_NOTEHUB_TOKEN ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVqaWsuYWxleDkyOTRAZ21haWwuY29tIiwiaWF0IjoxNzY1MTM0NzY1fQ.BZGm_DbZ1-a-3yZHvgf_Tr7COSbmRFl570_sYsM1v-k";

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});

// ==========================
// TYPES
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
  totalPages: number; // added
}

// ==========================
// API METHODS
// ==========================

// Fetch paginated + filtered notes
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

  const total = response.data.total ?? 0;
  const totalPages = Math.ceil(total / perPage);

  return {
    ...response.data,
    totalPages,
  };
}

// Fetch single note
export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get(`/${id}`);
  return response.data;
}

// Create new note
export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const response = await api.post("", payload);
  return response.data;
}

// Delete note
export async function deleteNote(
  id: string
): Promise<{ success: boolean }> {
  const response = await api.delete(`/${id}`);
  return response.data;
}
