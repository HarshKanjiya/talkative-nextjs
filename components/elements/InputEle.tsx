"use client";
import { FC } from "react";
import clsx from "clsx";
import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";

interface InputEleProps {
  label: string;
  id: string;
  type: string;
  required?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const InputEle: FC<InputEleProps> = ({
  label,
  id,
  type,
  register,
  required,
  errors,
  disabled,
}) => {
  return (
    <div className=" w-full flex flex-col gap-0.5 ">
      <label
        className=" block text-sm font-medium leading-6 text-gray-500"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

InputEle.displayName = "InputEle";
export default InputEle;
