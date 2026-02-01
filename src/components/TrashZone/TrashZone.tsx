import { forwardRef } from 'react';
import trashIcon from './red-trash.svg';

interface TrashZoneProps {
  isActive: boolean;
}

export const TrashZone = forwardRef<HTMLDivElement, TrashZoneProps>(
  ({ isActive }, ref) => {
    return (
      <div
        ref={ref}
        className={`fixed bottom-6 right-6 w-[140px] h-[140px] bg-white/98 backdrop-blur-md border-[3px] border-dashed rounded-2xl flex flex-col items-center justify-center transition-all duration-300 z-[1000] pointer-events-none shadow-xl ${
          isActive 
            ? 'bg-red-50/98 border-red-500 scale-115 shadow-2xl shadow-red-300/60 ring-4 ring-red-200/50' 
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50/98'
        }`}
      >
        <div className={`mb-3 transition-all duration-300 flex items-center justify-center ${
          isActive 
            ? 'scale-125 rotate-12 animate-bounce' 
            : 'hover:scale-110'
        }`}>
          <img 
            src={trashIcon} 
            alt="Trash" 
            className="w-12 h-12 object-contain"
          />
        </div>
        <div className={`text-xs text-center px-3 font-semibold transition-all duration-300 ${
          isActive 
            ? 'text-red-600 font-bold scale-110' 
            : 'text-gray-600'
        }`}>
          {isActive ? 'Release to delete' : 'Drop here to delete'}
        </div>
        {isActive && (
          <div className="absolute inset-0 rounded-2xl bg-red-500/10 animate-ping" />
        )}
      </div>
    );
  }
);

TrashZone.displayName = 'TrashZone';

