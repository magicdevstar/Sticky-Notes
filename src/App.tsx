import React, { useRef, useCallback } from 'react';
import { useNotes } from './hooks/useNotes';
import { useDrag } from './hooks/useDrag';
import { Header } from './components/Header/Header';
import { NotesContainer } from './components/NotesContainer/NotesContainer';
import { TrashZone } from './components/TrashZone/TrashZone';
import './App.css';

export const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trashRef = useRef<HTMLDivElement>(null);

  const {
    notes,
    createNote,
    updateNote,
    deleteNote,
    bringToFront,
    moveNote,
    resizeNote,
    getNote
  } = useNotes();

  const {
    dragState,
    isOverTrash,
    startDrag,
    isDragging,
    dragType
  } = useDrag({
    containerRef,
    onMove: moveNote,
    onResize: resizeNote,
    onDelete: deleteNote,
    trashRef
  });

  const handleDragStart = useCallback((type: 'move' | 'resize' | null, noteId: string, startX: number, startY: number) => {
    if (!type) return;
    const note = getNote(noteId);
    if (!note) return;
    startDrag(type, noteId, startX, startY, note);
  }, [getNote, startDrag]);

  const handleCreateNote = useCallback((x: number, y: number) => {
    if (dragState) return;
    createNote(x, y);
  }, [dragState, createNote]);

  return (
    <div className="app">
      <Header />
      <NotesContainer
        notes={notes}
        onNoteUpdate={updateNote}
        onNoteDelete={deleteNote}
        onNoteBringToFront={bringToFront}
        onDragStart={handleDragStart}
        isDragging={isDragging}
        dragType={dragType}
        onCreateNote={handleCreateNote}
        containerRef={containerRef}
      />
      <TrashZone ref={trashRef} isActive={isOverTrash} />
    </div>
  );
};
