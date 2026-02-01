export const NOTE_DEFAULTS = {
  WIDTH: 200,
  HEIGHT: 150,
  MIN_WIDTH: 150,
  MIN_HEIGHT: 100,
  DEFAULT_COLOR: '#ffeb3b'
} as const;

export const NOTE_COLORS: readonly { value: string; label: string }[] = [
  { value: '#ffeb3b', label: 'Yellow' },
  { value: '#ff9800', label: 'Orange' },
  { value: '#f44336', label: 'Red' },
  { value: '#4caf50', label: 'Green' },
  { value: '#2196f3', label: 'Blue' },
  { value: '#9c27b0', label: 'Purple' },
  { value: '#e91e63', label: 'Pink' }
] as const;

export const PLACEHOLDER_TEXT = 'Double-click to edit';

