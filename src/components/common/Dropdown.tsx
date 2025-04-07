"use client";

import { IoMdArrowDropdown } from "react-icons/io";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { LOCATION_OPTION } from "@/constants/ui";
import { cn } from "@/lib/utils";

interface IOption {
  value: string;
  label: string;
}

interface IDropdownProps {
  option?: Array<IOption>;
  placeholder?: string;
  type?: "default" | "form";
  defaultValue?: string;
  onSelect?: (value: string) => void;
}

const Dropdown = ({
  option = LOCATION_OPTION,
  placeholder,
  type = "default",
  defaultValue,
  onSelect,
}: IDropdownProps) => {
  return (
    <Select
      onValueChange={onSelect}
      defaultValue={defaultValue}
      value={defaultValue}
    >
      <SelectTrigger
        className={cn(
          "w-full justify-between rounded-xl bg-white px-3 md:min-w-[110px]",
          type === "form"
            ? "border-gray-50 bg-gray-50 data-[placeholder]:text-gray-400"
            : "bg-white data-[placeholder]:text-gray-800",
        )}
      >
        <SelectValue placeholder={`${placeholder || "지역 전체"}`} />
        <IoMdArrowDropdown size={16} color="black" className="ml-2.5" />
      </SelectTrigger>
      <SelectContent className="w-full min-w-[110px] rounded-xl bg-white text-black">
        {type === "default" && (
          <SelectItem
            value="total"
            className="h-[32px] cursor-pointer rounded-xl px-2 py-1.5 pl-2 text-sm focus:bg-purple-100"
          >
            {"전체"}
          </SelectItem>
        )}
        {option?.map((option, i) => (
          <SelectItem
            key={`option-${i}`}
            value={option.value}
            className="h-[32px] cursor-pointer rounded-xl px-2 py-1.5 pl-2 text-sm focus:bg-purple-100"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
