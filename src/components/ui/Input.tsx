"use client";

import { motion } from "framer-motion";
import { forwardRef, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import { cn } from "@/lib/utils";

import { Label } from "./Label";

const INPUT_BASE_STYLE =
  "flex h-11 w-full rounded-xl border-2 border-transparent bg-gray-50 px-[10px] py-4 text-sm text-gray-800 placeholder:text-gray-400 hover:border-purple-300 focus:border-purple-600 focus-visible:outline-none disabled:border-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base" as const;
// 공통 애니메이션 설정
const shakeAnimation = {
  x: [0, -5, 5, -3, 3, 0],
};

const animationTransition = {
  duration: 0.4,
  ease: "easeInOut",
};

interface InputProps extends React.ComponentProps<"input"> {
  type: "text" | "password" | "email" | "number" | "tel";
  id: string;
  label: string;
  labelCustom?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errorMsg?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      id,
      label,
      labelCustom,
      value,
      placeholder,
      required,
      disabled,
      errorMsg,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [inputType, setInputType] = useState<string>(type);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
      setInputType(showPassword ? "password" : "text");
    };

    return (
      <motion.div
        className="relative"
        animate={errorMsg ? shakeAnimation : {}}
        transition={animationTransition}
      >
        <Label
          htmlFor={id}
          className={cn("text-sm font-semibold text-gray-900", labelCustom)}
        >
          {label}
        </Label>
        <input
          type={type === "password" ? inputType : type}
          className={cn(
            INPUT_BASE_STYLE,
            className,
            errorMsg &&
              "border-red-600 focus:border-red-600 hover:border-red-300",
          )}
          ref={ref}
          {...props}
          id={id}
          value={value}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onChange={onChange}
          autoComplete="off"
          aria-label={`${id}-input`}
        />
        {type === "password" && (
          <button
            type="button"
            tabIndex={-1}
            onClick={togglePasswordVisibility}
            className="absolute right-[10px] top-9 bg-gray-50 pl-2 outline-none"
          >
            {showPassword ? (
              <IoEyeOutline className="h-5 w-5 text-gray-900" />
            ) : (
              <IoEyeOffOutline className="h-5 w-5 text-gray-900" />
            )}
          </button>
        )}

        {errorMsg && (
          <motion.p
            className="mt-2 text-sm font-semibold text-red-600"
            role="alert"
            animate={shakeAnimation}
            transition={animationTransition}
            key={`error-${errorMsg}`}
            tabIndex={-1}
          >
            {errorMsg}
          </motion.p>
        )}
      </motion.div>
    );
  },
);
Input.displayName = "Input";

export { Input };
