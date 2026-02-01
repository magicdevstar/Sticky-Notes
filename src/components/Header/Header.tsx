import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className="px-6 py-5 bg-gradient-to-r from-white to-gray-50/80 backdrop-blur-md shadow-md border-b border-gray-200/60 z-[1000]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Sticky Notes</h1>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span className="font-medium">Double-click</span>
            <span>anywhere to create a note</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="font-medium">Drag header</span>
            <span>to move</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <span className="font-medium">Drag corner</span>
            <span>to resize</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <span className="font-medium">Double-click note</span>
            <span>to edit</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span className="font-medium">Drag to trash</span>
            <span>to delete</span>
          </div>
        </div>
      </div>
    </div>
  );
};

