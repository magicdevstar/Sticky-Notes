import React from 'react';
import { Note } from '../../types';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { NOTE_COLORS } from '../../constants';

interface NoteHeaderProps {
  note: Note;
  onColorChange: (color: string) => void;
  onDelete: () => void;
}

export const NoteHeader: React.FC<NoteHeaderProps> = ({
  note,
  onColorChange,
  onDelete
}) => {

  return (
    <div className="flex justify-between items-center py-1.5 px-3 bg-black/5 border-b border-black/10 min-h-[32px] relative pointer-events-none">
      <div className="pointer-events-auto relative z-10">
        <Select
          value={note.color}
          onChange={onColorChange}
          options={NOTE_COLORS}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <div className="pointer-events-auto relative z-10">
        <Button
          variant="danger"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          title="Delete note"
        >
          ×
        </Button>
      </div>
    </div>
  );
};

