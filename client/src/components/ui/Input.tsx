import * as React from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

type InputVariant = 'text' | 'textarea';
type InputType = 'text' | 'tel' | 'email' | 'password';

interface BaseInputProps {
  label: string;
  name: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

interface TextInputProps extends BaseInputProps {
  variant?: 'text';
  type?: InputType;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

interface TextareaProps extends BaseInputProps {
  variant: 'textarea';
  type?: never;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

export type InputProps = TextInputProps | TextareaProps;

const TextInputInner = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, name, type = 'text', placeholder, error, required, className, disabled, value, onChange, onBlur }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
    const [focused, setFocused] = React.useState(false);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={name}
            className="block mb-2 text-sm font-medium text-text-muted uppercase tracking-wider text-[12px]"
          >
            {label}
            {required && <span className="text-gold-400 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            id={name}
            name={name}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            value={value}
            onChange={onChange}
            onBlur={(e) => {
              setFocused(false);
              onBlur?.(e);
            }}
            onFocus={() => setFocused(true)}
            className={cn(
              'w-full px-4 py-3 bg-background-secondary/80 text-text placeholder-text-muted/60 font-sans text-sm transition-all duration-300 outline-none border',
              error
                ? 'border-red-500/70 focus:border-red-500 focus:ring-1 focus:ring-red-500/50'
                : focused
                ? 'border-gold-400 ring-1 ring-gold-400/40 bg-background-secondary'
                : 'border-purple-700/50 hover:border-purple-600/70',
              disabled && 'opacity-50 cursor-not-allowed',
              isPassword && 'pr-12',
              className
            )}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-gold-400 transition-colors p-1"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-red-400 font-medium tracking-wide">
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextInputInner.displayName = 'TextInputInner';

const TextareaInner = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, name, placeholder, error, required, className, disabled, value, onChange, onBlur, rows = 5 }, ref) => {
    const [focused, setFocused] = React.useState(false);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={name}
            className="block mb-2 text-sm font-medium text-text-muted uppercase tracking-wider text-[12px]"
          >
            {label}
            {required && <span className="text-gold-400 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows}
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          onFocus={() => setFocused(true)}
          className={cn(
            'w-full px-4 py-3 bg-background-secondary/80 text-text placeholder-text-muted/60 font-sans text-sm transition-all duration-300 outline-none resize-none border',
            error
              ? 'border-red-500/70 focus:border-red-500 focus:ring-1 focus:ring-red-500/50'
              : focused
              ? 'border-gold-400 ring-1 ring-gold-400/40 bg-background-secondary'
              : 'border-purple-700/50 hover:border-purple-600/70',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
        />
        {error && (
          <p className="mt-1.5 text-xs text-red-400 font-medium tracking-wide">
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextareaInner.displayName = 'TextareaInner';

const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>((props, ref) => {
  if (props.variant === 'textarea') {
    return <TextareaInner ref={ref as React.Ref<HTMLTextAreaElement>} {...props} />;
  }
  return <TextInputInner ref={ref as React.Ref<HTMLInputElement>} {...props} />;
});

Input.displayName = 'Input';

export { Input };
export default Input;
