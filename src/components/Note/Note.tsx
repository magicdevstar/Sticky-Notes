import React, { memo, useCallback, useMemo } from 'react';
import { Note as NoteType, DragType } from '../../types';
import { useNoteEditor } from '../../hooks/useNoteEditor';
import { NoteHeader } from './NoteHeader';
import { NoteContent } from './NoteContent';
import { DragHandle } from './DragHandle';

interface NoteProps {
  note: NoteType;
  onUpdate: (note: NoteType) => void;
  onDelete: (id: string) => void;
  onBringToFront: (id: string) => void;
  onDragStart: (type: DragType, noteId: string, startX: number, startY: number) => void;
  isDragging: boolean;
  dragType: DragType;
}

export const Note: React.FC<NoteProps> = memo(({
  note,
  onUpdate,
  onDelete,
  onBringToFront,
  onDragStart,
  isDragging,
  dragType
}) => {
  const {
    isEditing,
    text,
    setText,
    textareaRef,
    startEditing,
    stopEditing,
    handleKeyDown
  } = useNoteEditor({
    note,
    onUpdate,
    onBringToFront
  });

  const handleMouseDown = useCallback((e: React.MouseEvent, type: DragType) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (type === 'move') {
      onBringToFront(note.id);
    }
    
    onDragStart(type, note.id, e.clientX, e.clientY);
  }, [note.id, onBringToFront, onDragStart]);

  const handleColorChange = useCallback((color: string) => {
    onUpdate({ ...note, color });
  }, [note, onUpdate]);

  const handleDelete = useCallback(() => {
    onDelete(note.id);
  }, [note.id, onDelete]);

  const noteStyle: React.CSSProperties = useMemo(() => ({
    left: `${note.x}px`,
    top: `${note.y}px`,
    width: `${note.width}px`,
    height: `${note.height}px`,
    backgroundColor: note.color,
    zIndex: note.zIndex
  }), [note.x, note.y, note.width, note.height, note.color, note.zIndex]);

  const cursor = dragType === 'move' ? 'grabbing' : dragType === 'resize' ? 'nwse-resize' : 'default';

  return (
    <div
      className={`absolute rounded-lg shadow-lg flex flex-col overflow-hidden select-none ${
        isDragging 
          ? 'opacity-90 shadow-2xl scale-[1.02]' 
          : 'hover:shadow-xl hover:scale-[1.01]'
      } ${isEditing ? 'ring-2 ring-blue-400/50' : ''}`}
      style={{ ...noteStyle, cursor }}
      onDoubleClick={startEditing}
      onClick={(e) => e.stopPropagation()}
    >
      <NoteHeader
        note={note}
        onColorChange={handleColorChange}
        onDelete={handleDelete}
      />
      <div className="flex-1 min-h-0 overflow-hidden p-3 bg-white/30">
        <NoteContent
          isEditing={isEditing}
          text={text}
          onTextChange={setText}
          onBlur={stopEditing}
          onKeyDown={handleKeyDown}
          textareaRef={textareaRef}
        />
      </div>
      <DragHandle type="move" onMouseDown={handleMouseDown} />
      <DragHandle type="resize" onMouseDown={handleMouseDown} />
    </div>
  );
});

Note.displayName = 'Note';

