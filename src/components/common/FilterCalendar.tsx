"use client";

import { ko } from "date-fns/locale";
import dayjs from "dayjs";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

import { Button } from "@/components/ui/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import useCustomSearchParams from "@/hooks/useCustomSearchParams";

import { Calendar } from "../ui/Calendar";

interface IFilterCalendarProps {
  selectedDate: string | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
  disabledType?: "afterToday" | undefined;
}

const FilterCalendar = ({
  selectedDate,
  setSelectedDate,
  disabledType,
}: IFilterCalendarProps) => {
  const { setSearchParams } = useCustomSearchParams();

  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());

  const onClickDate = (type?: string) => {
    const formatDate = dayjs(date).format("YYYY-MM-DD");
    const isReset = type === "reset";
    let value = "";

    if (isReset) {
      setDate(new Date());
      value = "";
    } else {
      value = formatDate;
    }
    setSelectedDate(isReset ? null : formatDate);
    setIsCalendarOpen(false);

    setSearchParams({
      date: value,
    });
  };

  return (
    <>
      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className="w-full min-w-[110px] rounded-xl bg-white py-2 hover:bg-white"
          >
            <span className="text-sm font-normal text-gray-800">
              {selectedDate || "날짜 전체"}
            </span>
            <IoMdArrowDropdown size={16} color="black" className="ml-2.5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto translate-y-4 rounded-xl px-[43px] py-6"
          align="start"
        >
          <Calendar
            mode="single"
            selected={date}
            onDayClick={setDate}
            fromDate={disabledType === "afterToday" ? new Date() : undefined}
            initialFocus
            locale={ko}
          />
          <div className="flex items-center justify-center gap-3">
            <Button
              variant={"purple-outline"}
              className="h-[40px] w-[118px]"
              onClick={() => onClickDate("reset")}
            >
              초기화
            </Button>
            <Button
              variant={"purple"}
              className="h-[40px] w-[118px]"
              onClick={() => onClickDate()}
            >
              적용
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default FilterCalendar;
