import { NOTE_DEFAULTS } from '../constants/index';

export interface ContainerBounds {
  width: number;
  height: number;
}

export const constrainPosition = (
  x: number,
  y: number,
  width: number,
  height: number,
  container: ContainerBounds
): { x: number; y: number } => {
  return {
    x: Math.max(0, Math.min(x, container.width - width)),
    y: Math.max(0, Math.min(y, container.height - height))
  };
};

export const constrainSize = (
  width: number,
  height: number,
  x: number,
  y: number,
  container: ContainerBounds
): { width: number; height: number } => {
  return {
    width: Math.max(
      NOTE_DEFAULTS.MIN_WIDTH,
      Math.min(width, container.width - x)
    ),
    height: Math.max(
      NOTE_DEFAULTS.MIN_HEIGHT,
      Math.min(height, container.height - y)
    )
  };
};

export const generateNoteId = (): string => {
  return `note-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

