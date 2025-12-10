import axios from 'axios';

const API_URL = 'https://notehub.net.ua/api/notes';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// Додайте параметр tag
export async function fetchNotes(tag?: string) {
  const params = tag ? { tag } : {};
  const response = await axios.get(API_URL, { params });
  return response.data;
}

export async function fetchNoteById(id: string) {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}

// інші функції...
