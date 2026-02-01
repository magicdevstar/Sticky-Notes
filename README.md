# Sticky Notes Application

A modern, production-ready single-page web application for managing sticky notes with intuitive drag-and-drop functionality. Built with React, TypeScript, and Tailwind CSS.

## Features

### Core Features

1. **Create Notes** - Double-click anywhere on the canvas to create a new sticky note at that position
2. **Resize Notes** - Drag the bottom-right corner handle to resize notes to your preferred size
3. **Move Notes** - Click and drag from the header area to reposition notes anywhere on the canvas
4. **Delete Notes** - Drag a note over the trash zone in the bottom-right corner, or click the delete button in the note header

### Additional Features

- **Edit Text** - Double-click any note to enter edit mode. Press Ctrl/Cmd+Enter to save or Escape to cancel
- **Auto-Focus Management** - Notes automatically come to the front when you interact with them
- **Persistent Storage** - All notes are automatically saved to localStorage and restored when you return
- **Color Customization** - Choose from 7 different colors using the dropdown in each note's header
- **API Integration** - Mocked REST API ready for backend integration (currently uses in-memory storage)

## Getting Started

### Prerequisites

- Node.js version 16 or higher
- npm or yarn package manager

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:3000` and will automatically open in your browser.

### Building for Production

Create an optimized production build:

```bash
npm run build
```

The compiled files will be output to the `dist` directory, ready for deployment.

To preview the production build locally:

```bash
npm run preview
```