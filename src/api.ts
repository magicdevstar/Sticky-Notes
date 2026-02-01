import { Note } from './types';

const API_DELAY = 0;

const mockNotes: Note[] = [];

export const api = {
  async getNotes(): Promise<Note[]> {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    return [...mockNotes];
  },

  async saveNotes(notes: Note[]): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    mockNotes.length = 0;
    mockNotes.push(...notes);
  },

  async createNote(note: Note): Promise<Note> {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    mockNotes.push(note);
    return note;
  },

  async updateNote(note: Note): Promise<Note> {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    const index = mockNotes.findIndex(n => n.id === note.id);
    if (index !== -1) {
      mockNotes[index] = note;
    }
    return note;
  },

  async deleteNote(noteId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    const index = mockNotes.findIndex(n => n.id === noteId);
    if (index !== -1) {
      mockNotes.splice(index, 1);
    }
  }
};

