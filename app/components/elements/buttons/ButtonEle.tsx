"use client";
import { FC } from "react";
import { clsx } from "clsx";

interface ButtonEleProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const ButtonEle: FC<ButtonEleProps> = ({
  type = "button",
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `
    flex
    justify-center
    items-center
    px-3
    py-2.5
    text-sm
    tracking-wide
    font-semibold
    rounded-md
    focus:outline
    focus-visible:outline-2
    focus-visible:outline-offset-1
    transition-all
    `,
        fullWidth && "w-full",
        disabled && " opacity-50 cursor-not-allowed",
        secondary && "text-gray-700 bg-gray-200 hover:bg-gray-300 ",
        danger && "text-white bg-red-500 hover:bg-red-600",
        !secondary &&
          !danger &&
          "text-white bg-emerald-500 hover:bg-emerald-600 focus-visible:outline focus-visible:outline-emerald-500 "
      )}
    >
      {children}
    </button>
  );
};

ButtonEle.displayName = "ButtonEle";
export default ButtonEle;
