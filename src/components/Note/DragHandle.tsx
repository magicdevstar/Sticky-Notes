import React from 'react';
import { DragType } from '../../types';

interface DragHandleProps {
  type: DragType;
  onMouseDown: (e: React.MouseEvent, type: DragType) => void;
}

export const DragHandle: React.FC<DragHandleProps> = ({
  type,
  onMouseDown
}) => {
  if (type === 'move') {
    return (
      <div
        className="absolute top-0 left-0 right-0 h-[32px] cursor-grab active:cursor-grabbing z-[2] transition-opacity hover:opacity-80"
        onMouseDown={(e) => onMouseDown(e, 'move')}
      />
    );
  }

  if (type === 'resize') {
    return (
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize bg-black/15 rounded-tl z-[2] hover:bg-black/25 transition-colors border-t-2 border-l-2 border-black/20"
        onMouseDown={(e) => onMouseDown(e, 'resize')}
      />
    );
  }

  return null;
};

