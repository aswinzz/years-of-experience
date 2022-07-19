import React from 'react';
import '../styles/components/Input.css';

function Input({ label, onChange, value }: InputProps) {

  return (
    <label className="inp">
        <input value={value} onChange={({target: { value }}) => onChange(value)} type="text" className="input-text" placeholder="&nbsp;" />
        <span className="label">{label}</span>
    </label>
  );
}

declare interface InputProps {
    label: string,
    value: string,
    onChange: (value: string) => void
};

export default Input;
