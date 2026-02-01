import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'default';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'small',
  className = '',
  children,
  ...props
}) => {
  const base = 'border-none rounded-md cursor-pointer inline-flex items-center justify-center font-medium transition-all duration-200 select-none focus:outline-none focus:ring-2 focus:ring-offset-1';
  
  const sizes = {
    small: 'w-6 h-6 text-base leading-none p-0 min-w-[24px]',
    medium: 'py-2 px-4 text-sm min-h-[36px]',
    large: 'py-3 px-6 text-base min-h-[44px]'
  };

  const variants = {
    default: 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 focus:ring-gray-400 shadow-sm hover:shadow',
    danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 focus:ring-red-400 shadow-md hover:shadow-lg',
    primary: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-400 shadow-md hover:shadow-lg'
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-sm ${className}`.trim();

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

