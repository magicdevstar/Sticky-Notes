import { useState, useEffect, useCallback } from 'react';
import { Note } from '../types';
import { api } from '../api';
import { storage } from '../storage';
import { NOTE_DEFAULTS } from '../constants/index';
import { generateNoteId } from '../utils/position';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1);

  useEffect(() => {
    const loadNotes = async () => {
      const savedNotes = storage.load();
      if (savedNotes.length > 0) {
        setNotes(savedNotes);
        const maxZ = Math.max(0, ...savedNotes.map(n => n.zIndex));
        setNextZIndex(maxZ + 1);
      } else {
        const apiNotes = await api.getNotes();
        if (apiNotes.length > 0) {
          setNotes(apiNotes);
          const maxZ = Math.max(0, ...apiNotes.map(n => n.zIndex));
          setNextZIndex(maxZ + 1);
        }
      }
    };
    loadNotes();
  }, []);

  useEffect(() => {
    storage.save(notes);
    api.saveNotes(notes).catch(() => {});
  }, [notes]);

  const createNote = useCallback((x: number, y: number, width?: number, height?: number): Note => {
    const newNote: Note = {
      id: generateNoteId(),
      x,
      y,
      width: width ?? NOTE_DEFAULTS.WIDTH,
      height: height ?? NOTE_DEFAULTS.HEIGHT,
      text: '',
      color: NOTE_DEFAULTS.DEFAULT_COLOR,
      zIndex: nextZIndex
    };

    setNotes(prev => [...prev, newNote]);
    setNextZIndex(prev => prev + 1);
    api.createNote(newNote).catch(() => {});
    return newNote;
  }, [nextZIndex]);

  const updateNote = useCallback((updatedNote: Note) => {
    setNotes(prev => prev.map(note =>
      note.id === updatedNote.id ? updatedNote : note
    ));
    api.updateNote(updatedNote).catch(() => {});
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    api.deleteNote(id).catch(() => {});
  }, []);

  const bringToFront = useCallback((id: string) => {
    setNotes(prev => prev.map(note =>
      note.id === id ? { ...note, zIndex: nextZIndex } : note
    ));
    setNextZIndex(prev => prev + 1);
  }, [nextZIndex]);

  const moveNote = useCallback((id: string, x: number, y: number) => {
    setNotes(prev => prev.map(note =>
      note.id === id ? { ...note, x, y } : note
    ));
  }, []);

  const resizeNote = useCallback((id: string, width: number, height: number) => {
    setNotes(prev => prev.map(note =>
      note.id === id ? { ...note, width, height } : note
    ));
  }, []);

  const getNote = useCallback((id: string): Note | undefined => {
    return notes.find(n => n.id === id);
  }, [notes]);

  return {
    notes,
    createNote,
    updateNote,
    deleteNote,
    bringToFront,
    moveNote,
    resizeNote,
    getNote
  };
};

