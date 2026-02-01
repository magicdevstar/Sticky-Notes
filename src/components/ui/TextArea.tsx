import React, { forwardRef } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoSelect?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = '', autoSelect = false, ...props }, ref) => {
    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (autoSelect) {
        e.target.select();
      }
      props.onFocus?.(e);
    };

    const classes = `w-full h-full resize-none border-none outline-none bg-transparent font-inherit text-inherit p-2 placeholder:text-black/40 ${className}`.trim();

    return (
      <textarea
        ref={ref}
        className={classes}
        onFocus={handleFocus}
        {...props}
      />
    );
  }
);

TextArea.displayName = 'TextArea';

