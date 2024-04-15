import React from "react";

const Button = ({
  children,
  type = "button",
  bgColor = "bg-[#4640DE]",
  textColor = "text-white",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`rounded-sm ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
