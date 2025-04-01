import clsx from "clsx";
import dayjs from "dayjs";

import { cn } from "@/lib/utils";

interface IDateTimeTagProps {
  size?: "small" | "medium";
  date: dayjs.Dayjs;
}

const baseStyle = (size: IDateTimeTagProps["size"]) =>
  cn(
    "flex items-center justify-center rounded-[4px] bg-purple-200 py-[2px] text-sm font-medium",
    size === "small" && "px-[6px] text-xs",
    size === "medium" && "px-2 text-sm",
  );

const DateTimeTag = ({ size = "medium", date }: IDateTimeTagProps) => {
  const dateText = date.format("M월 DD일");
  const timeText = date.format("HH:mm");

  return (
    <div className="flex gap-2">
      <time
        aria-label="날짜"
        className={clsx("text-black", baseStyle(size))}
        suppressHydrationWarning
      >
        {dateText}
      </time>
      <time
        aria-label="시간"
        className={clsx("text-purple-600", baseStyle(size))}
        suppressHydrationWarning
      >
        {timeText}
      </time>
    </div>
  );
};

export default DateTimeTag;
