import dayjs from "dayjs";
import { useState } from "react";

import { Button } from "@/components/ui/Button";

const baseStyle =
  "p-[10px] flex h-[100px] md:h-[300px] flex-col gap-3 scrollbar scrollbar-none overflow-y-scroll pl-4 first:pl-0 md:first:pl-3";

interface ITimePickerProps {
  selectedDate?: Date;
  setValue?: (value: Date) => void;
  value?: string;
}

const TimePicker = ({ selectedDate, setValue, value }: ITimePickerProps) => {
  const [selectedHour, setSelectedHour] = useState<number>(
    value
      ? dayjs(value).hour() === 12 || dayjs(value).hour() === 0
        ? 12
        : dayjs(value).hour() > 12
          ? dayjs(value).hour() - 12
          : dayjs(value).hour()
      : 12,
  );
  const [selectedMinute, setSelectedMinute] = useState<number>(
    value ? dayjs(value).minute() : 0,
  );
  const [selectedAmPm, setSelectedAmPm] = useState<string>(
    value ? dayjs(value).format("A") : "PM",
  );

  const updateDateTime = (
    hour: number = selectedHour,
    minute: number = selectedMinute,
    ampm: string = selectedAmPm,
  ) => {
    if (!selectedDate || !setValue) return;

    let adjustedHour = hour;

    if (ampm === "PM" && hour !== 12) {
      adjustedHour = hour + 12;
    } else if (ampm === "AM" && hour === 12) {
      adjustedHour = 0;
    }

    const formattedDateTime = new Date(
      dayjs(selectedDate)
        .hour(adjustedHour)
        .minute(minute)
        .format("YYYY-MM-DD hh:mm A"),
    );

    setValue(formattedDateTime);
  };

  return (
    <section className="flex divide-x divide-gray-200">
      <div className={baseStyle}>
        {Array.from({ length: 12 }).map((_, index) => {
          const hour = index === 0 ? 12 : index;
          return (
            <Button
              type="button"
              aria-label={`${hour.toString().padStart(2, "0")}시`}
              variant={selectedHour === hour ? "purple" : "ghost"}
              key={index}
              onClick={() => {
                setSelectedHour(hour);
                updateDateTime(hour);
              }}
            >
              {hour.toString().padStart(2, "0")}
            </Button>
          );
        })}
      </div>
      <div className={baseStyle}>
        {Array.from({ length: 12 }, (_, index) => index * 5).map(minute => (
          <Button
            type="button"
            aria-label={`${minute.toString().padStart(2, "0")}분`}
            variant={selectedMinute === minute ? "purple" : "ghost"}
            key={minute}
            onClick={() => {
              setSelectedMinute(minute);
              updateDateTime(selectedHour, minute);
            }}
          >
            {minute.toString().padStart(2, "0")}
          </Button>
        ))}
      </div>
      <div className={baseStyle}>
        <Button
          type="button"
          aria-label="PM"
          variant={selectedAmPm === "PM" ? "purple" : "ghost"}
          onClick={() => {
            setSelectedAmPm("PM");
            updateDateTime(selectedHour, selectedMinute, "PM");
          }}
        >
          {"PM"}
        </Button>
        <Button
          type="button"
          aria-label="AM"
          variant={selectedAmPm === "AM" ? "purple" : "ghost"}
          onClick={() => {
            setSelectedAmPm("AM");
            updateDateTime(selectedHour, selectedMinute, "AM");
          }}
        >
          {"AM"}
        </Button>
      </div>
    </section>
  );
};

export default TimePicker;
