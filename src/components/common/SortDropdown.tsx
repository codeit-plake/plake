"use client";

import { TbArrowsSort } from "react-icons/tb";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

interface IOption {
  value: string;
  label: string;
}

interface IDropdownProps {
  option?: Array<IOption>;
  placeholder?: string;
  defaultValue?: string;
  onSelect?: (value: string) => void;
}

const SortDropdown = ({
  option,
  placeholder,
  defaultValue,
  onSelect,
}: IDropdownProps) => {
  return (
    <Select
      onValueChange={onSelect}
      defaultValue={defaultValue}
      value={defaultValue}
      aria-label="정렬 드롭다운"
    >
      <SelectTrigger className="w-full justify-between rounded-xl bg-white px-3 data-[placeholder]:text-gray-800 md:min-w-[110px]">
        <TbArrowsSort size={18} />
        <span className="ml-2.5 !hidden md:!block">
          <SelectValue placeholder={`${placeholder || "정렬"}`} />
        </span>
      </SelectTrigger>
      <SelectContent className="w-full min-w-[110px] rounded-xl bg-white text-black">
        <SelectItem
          value="total"
          className="h-[32px] cursor-pointer rounded-xl px-2 py-1.5 pl-2 text-sm focus:bg-purple-100"
        >
          {"전체"}
        </SelectItem>
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

export default SortDropdown;
