import React from "react";

export function Button({
  children,
  className = "",
  variant = "default",
  disabled = false,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default:
      "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500",
    outline:
      "border-2 border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700 focus:ring-gray-500",
    ghost: "hover:bg-gray-100 text-gray-700",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
