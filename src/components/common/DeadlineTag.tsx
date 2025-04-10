import dayjs from "dayjs";
import { FaClock } from "react-icons/fa6";

interface IDeadlineTagProps {
  registrationEnd: dayjs.Dayjs;
}

const DeadlineTag = ({ registrationEnd }: IDeadlineTagProps) => {
  const today = dayjs().format("YYYY-MM-DDTHH:mm:ss"); //오늘일자
  const deadlineHour = registrationEnd.format("H");

  const isOpened = registrationEnd.isAfter(today); // 모임오픈 여부 (모임이 종료되지 않았을 경우: true)
  const isEndDay =
    dayjs().format("YYYY/MM/DD") === registrationEnd.format("YYYY/MM/DD"); //오늘일자와 마감일자가 같으면 종료일로 설정
  const diff = registrationEnd.diff(today, "day") || "1";

  return (
    <>
      {isOpened && (
        <section
          aria-label="등록 마감까지 남은 시간"
          className="absolute right-0 z-10 flex h-8 w-[120px] min-w-[120px] items-center justify-center gap-2 rounded-bl-xl bg-purple-600 text-white"
        >
          <FaClock size={14} />
          <span className="text-xs">
            {isEndDay ? `오늘 ${deadlineHour}시 마감` : `${diff}일 후 마감`}
          </span>
        </section>
      )}
    </>
  );
};

export default DeadlineTag;
