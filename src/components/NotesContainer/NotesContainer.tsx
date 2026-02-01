import React, { useCallback } from 'react';
import { Note as NoteType, DragType } from '../../types';
import { Note } from '../Note/Note';
import { NOTE_DEFAULTS } from '../../constants';
import { constrainPosition } from '../../utils/position';

interface NotesContainerProps {
  notes: NoteType[];
  onNoteUpdate: (note: NoteType) => void;
  onNoteDelete: (id: string) => void;
  onNoteBringToFront: (id: string) => void;
  onDragStart: (type: DragType, noteId: string, startX: number, startY: number) => void;
  isDragging: (noteId: string) => boolean;
  dragType: (noteId: string) => DragType;
  onCreateNote: (x: number, y: number) => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

export const NotesContainer: React.FC<NotesContainerProps> = ({
  notes,
  onNoteUpdate,
  onNoteDelete,
  onNoteBringToFront,
  onDragStart,
  isDragging,
  dragType,
  onCreateNote,
  containerRef
}) => {
  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    if (e.target !== e.currentTarget || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - containerRect.left - NOTE_DEFAULTS.WIDTH / 2;
    const clickY = e.clientY - containerRect.top - NOTE_DEFAULTS.HEIGHT / 2;

    const position = constrainPosition(
      clickX,
      clickY,
      NOTE_DEFAULTS.WIDTH,
      NOTE_DEFAULTS.HEIGHT,
      { width: containerRect.width, height: containerRect.height }
    );

    onCreateNote(position.x, position.y);
  }, [containerRef, onCreateNote]);

  return (
    <div
      ref={containerRef}
      className="flex-1 relative overflow-hidden cursor-crosshair"
      onDoubleClick={handleDoubleClick}
    >
      {notes.map(note => (
        <Note
          key={note.id}
          note={note}
          onUpdate={onNoteUpdate}
          onDelete={onNoteDelete}
          onBringToFront={onNoteBringToFront}
          onDragStart={onDragStart}
          isDragging={isDragging(note.id)}
          dragType={dragType(note.id)}
        />
      ))}
    </div>
  );
};

