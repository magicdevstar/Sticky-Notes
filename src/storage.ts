import { Note } from './types';

const STORAGE_KEY = 'sticky-notes';

export const storage = {
  load(): Note[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  save(notes: Note[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // Silently fail - localStorage may be disabled or full
    }
  }
};

