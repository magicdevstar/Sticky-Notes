import { useState, useEffect, useRef, useCallback } from 'react';
import { Note } from '../types';

interface UseNoteEditorOptions {
  note: Note;
  onUpdate: (note: Note) => void;
  onBringToFront: (id: string) => void;
}

export const useNoteEditor = ({
  note,
  onUpdate,
  onBringToFront
}: UseNoteEditorOptions) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(note.text);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setText(note.text);
  }, [note.text]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  const startEditing = useCallback(() => {
    setIsEditing(true);
    onBringToFront(note.id);
  }, [note.id, onBringToFront]);

  const stopEditing = useCallback(() => {
    setIsEditing(false);
    const trimmedText = text.trim();
    if (trimmedText !== note.text.trim()) {
      onUpdate({ ...note, text: trimmedText });
    }
  }, [text, note, onUpdate]);

  const cancelEditing = useCallback(() => {
    setText(note.text);
    setIsEditing(false);
  }, [note.text]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      stopEditing();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  }, [stopEditing, cancelEditing]);

  return {
    isEditing,
    text,
    setText,
    textareaRef,
    startEditing,
    stopEditing,
    handleKeyDown
  };
};

