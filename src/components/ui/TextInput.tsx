import type { InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const TextInput = ({ label, error, id, className = '', ...props }: TextInputProps) => {
  const inputId = id || props.name;

  return (
    <label className="field" htmlFor={inputId}>
      {label && <span className="field__label">{label}</span>}
      <input
        id={inputId}
        className={[className, error ? 'field__input-error' : ''].filter(Boolean).join(' ')}
        aria-invalid={error ? 'true' : undefined}
        {...props}
      />
      {error && <span className="field__error">{error}</span>}
    </label>
  );
};

export default TextInput;
