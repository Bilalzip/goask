"use client";
import React from "react";

interface ButtonProps {
  handleClick: () => void;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  btnName: string;
  classStyle?: string;
}

const Button: React.FC<ButtonProps> = ({
  handleClick,
  icon: Icon,
  btnName,
  classStyle,
}) => {
  return (
    <div>
      <button
        onClick={handleClick}
        className={`relative overflow-hidden focus:outline-none bg-yellow-400 text-black font-bold py-2 px-4 rounded shadow-md flex mx-auto gap-2 ${classStyle} text-center`}
      >
        {Icon && <Icon className="mt-1" />}
        {btnName}
      </button>
    </div>
  );
};

export default Button;
