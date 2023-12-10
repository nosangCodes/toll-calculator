"use client";
import React from "react";

type Props = {
  placeholder: string;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  required?: boolean
};

export default function Input({
  placeholder,
  className,
  value,
  onChange,
  name,
  required
}: Props) {
  return (
    <div>
      <input
        className={`${className} border border-sky-100 px-2 py-1`}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
      />
    </div>
  );
}
