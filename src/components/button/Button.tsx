"use client";
import React from "react";

type Props = {
  label: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
  disabled?: boolean;
};

export default function Button({
  label,
  onClick,
  type = "button",
  className,
  disabled,
}: Props) {
  return (
    <button
      disabled={disabled}
      className={`${className} disabled:cursor-progress`}
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
