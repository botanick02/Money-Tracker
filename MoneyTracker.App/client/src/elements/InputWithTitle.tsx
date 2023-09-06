import React from 'react';

interface Props{
  type: "text" | "number" | "password" | "time" | "datetime-local" | "date"
  placeholder: string
  className?: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
  value: string | number
}

const InputWithTitle: React.FC<Props> = ({type, placeholder, className, onChange, value}) => {

  return (
    <div className={`input-field-labeled ${className ?? ''}`}>
      <label className={value ? 'focused' : ''}>{placeholder}</label>
      <input value={value} type={type} onChange={onChange} placeholder={placeholder}/>
    </div>
  );
};

export default InputWithTitle;