import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children' | 'onChange'> {
  options: readonly SelectOption[];
  value: string;
  onChange: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  className = '',
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative inline-block">
      <select
        className={`appearance-none border border-gray-300 rounded-md px-3 py-1.5 bg-white cursor-pointer text-xs font-medium text-gray-700 z-[2] relative focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 hover:border-gray-400 transition-all shadow-sm hover:shadow ${className}`.trim()}
        value={value}
        onChange={handleChange}
        {...props}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

