# Sticky Notes Application

A single-page web application for managing sticky notes with drag-and-drop functionality, built with React and TypeScript.

## Features

### Required Features (All 4 implemented)
1. ✅ **Create a new note** - Click anywhere on the canvas to create a note at that position
2. ✅ **Change note size by dragging** - Drag the bottom-right corner to resize
3. ✅ **Move a note by dragging** - Drag from the top header area to move
4. ✅ **Remove a note by dragging** - Drag a note over the trash zone to delete

### Bonus Features (All 5 implemented)
1. ✅ **Entering/editing note text** - Double-click any note to edit text
2. ✅ **Moving notes to front** - Clicking or dragging a note brings it to the front
3. ✅ **Saving notes to local storage** - Notes are automatically saved and restored
4. ✅ **Different note colors** - Use the color selector in the note header
5. ✅ **Saving notes to REST API** - Mocked asynchronous API with 500ms delay

## Build Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Production Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

The built files will be in the `dist` directory.

## Architecture

The application follows a component-based architecture with clear separation of concerns. The main `App` component manages the global state of all notes and coordinates drag operations. Each `Note` component is a self-contained unit that handles its own rendering, text editing, and user interactions. State management is handled through React's built-in hooks (`useState`, `useCallback`, `useEffect`), ensuring efficient re-renders and proper memoization of callbacks.

The application implements a dual persistence strategy: notes are saved to both localStorage for immediate availability and a mocked REST API for demonstration purposes. The API service (`api.ts`) simulates asynchronous operations with a 500ms delay, while the storage service (`storage.ts`) provides synchronous localStorage access. Drag operations are managed through a centralized drag state system that tracks the type of drag (move or resize), the target note, and initial positions, allowing for smooth and responsive interactions.

Performance optimizations include the use of `useCallback` hooks to prevent unnecessary re-renders, proper event listener cleanup, and efficient state updates that only modify the affected note. The z-index management system ensures that interacted notes are brought to the front, and the trash zone detection uses bounding box calculations for accurate drop detection. The codebase is fully typed with TypeScript, providing compile-time safety and better developer experience.

