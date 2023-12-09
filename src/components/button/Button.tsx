import React from "react";

type Props = {
  label: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
};

export default function Button({
  label,
  onClick,
  type = "button",
  className,
}: Props) {
  return (
    <div>
      <button className={`${className}`} type={type} onClick={onClick}>
        {label}
      </button>
    </div>
  );
}
