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
    <div className=" w-full flex flex-col gap-1 min-w-full ">
      <label
        className=" block text-xs lg:text-sm font-medium leading-6 text-gray-500"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="">
        <input
          id={id}
          type={type}
          disabled={!!disabled}
          {...register(id, { required })}
          className={clsx(
            `
          form-input
          border-0
          w-full
          rounded-md
          ring-1
          ring-inset
          ring-gray-200
          focus:ring-emerald-500
          focus:ring-2
          shadow-sm
          sm:text-sm
          md:text-base
          min-w-[16rem]
          text-[#252525]
          bg-gray-100
          `,
            errors[id] && "ring-rose-500",
            disabled && " opacity-50 cursor-not-allowed "
          )}
        />
      </div>
    </div>
  );
};

InputEle.displayName = "InputEle";
export default InputEle;
