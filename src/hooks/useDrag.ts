import { useState, useCallback, useEffect } from 'react';
import { DragState, DragType } from '../types';
import { constrainPosition, constrainSize } from '../utils/position';

interface UseDragOptions {
  containerRef: React.RefObject<HTMLElement>;
  onMove: (id: string, x: number, y: number) => void;
  onResize: (id: string, width: number, height: number) => void;
  onDelete?: (id: string) => void;
  trashRef?: React.RefObject<HTMLElement>;
}

export const useDrag = ({
  containerRef,
  onMove,
  onResize,
  onDelete,
  trashRef
}: UseDragOptions) => {
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [isOverTrash, setIsOverTrash] = useState(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragState || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const deltaX = e.clientX - dragState.startX;
      const deltaY = e.clientY - dragState.startY;

      if (dragState.type === 'move') {
        const newX = dragState.initialX + deltaX;
        const newY = dragState.initialY + deltaY;
        const constrained = constrainPosition(
          newX,
          newY,
          dragState.initialWidth,
          dragState.initialHeight,
          { width: containerRect.width, height: containerRect.height }
        );

        onMove(dragState.noteId, constrained.x, constrained.y);

        if (trashRef?.current) {
          const trashRect = trashRef.current.getBoundingClientRect();
          const isInTrash =
            e.clientX >= trashRect.left &&
            e.clientX <= trashRect.right &&
            e.clientY >= trashRect.top &&
            e.clientY <= trashRect.bottom;
          setIsOverTrash(isInTrash);
        }
      } else if (dragState.type === 'resize') {
        const newWidth = dragState.initialWidth + deltaX;
        const newHeight = dragState.initialHeight + deltaY;
        const constrained = constrainSize(
          newWidth,
          newHeight,
          dragState.initialX,
          dragState.initialY,
          { width: containerRect.width, height: containerRect.height }
        );

        onResize(dragState.noteId, constrained.width, constrained.height);
      }
    },
    [dragState, containerRef, onMove, onResize, trashRef]
  );

  const handleMouseUp = useCallback(() => {
    if (dragState) {
      if (isOverTrash && onDelete) {
        onDelete(dragState.noteId);
      }
      setDragState(null);
      setIsOverTrash(false);
    }
  }, [dragState, isOverTrash, onDelete]);

  useEffect(() => {
    if (dragState) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragState, handleMouseMove, handleMouseUp]);

  const startDrag = useCallback(
    (type: DragType, noteId: string, startX: number, startY: number, note: {
      x: number;
      y: number;
      width: number;
      height: number;
    }) => {
      setDragState({
        type,
        noteId,
        startX,
        startY,
        initialX: note.x,
        initialY: note.y,
        initialWidth: note.width,
        initialHeight: note.height
      });
    },
    []
  );

  return {
    dragState,
    isOverTrash,
    startDrag,
    isDragging: (noteId: string) => dragState?.noteId === noteId,
    dragType: (noteId: string) => dragState?.noteId === noteId ? dragState.type : null
  };
};

