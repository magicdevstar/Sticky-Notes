import React from 'react';
import { TextArea } from '../ui/TextArea';
import { PLACEHOLDER_TEXT } from '../../constants';

interface NoteContentProps {
  isEditing: boolean;
  text: string;
  onTextChange: (text: string) => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

export const NoteContent: React.FC<NoteContentProps> = ({
  isEditing,
  text,
  onTextChange,
  onBlur,
  onKeyDown,
  textareaRef
}) => {
  if (isEditing) {
    return (
      <TextArea
        ref={textareaRef}
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        autoSelect
        className="w-full h-full focus:outline-none"
        placeholder="Start typing..."
      />
    );
  }

  return (
    <div className="overflow-auto break-words whitespace-pre-wrap text-gray-800 text-sm leading-relaxed min-h-[60px]">
      {text ? (
        <span className="text-gray-900">{text}</span>
      ) : (
        <span className="text-gray-400 italic">{PLACEHOLDER_TEXT}</span>
      )}
    </div>
  );
};

