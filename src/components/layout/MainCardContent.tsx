import dayjs from "dayjs";
import { FaArrowRight } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { RxDividerVertical } from "react-icons/rx";

import { ONLINE } from "@/constants/gatheringFilterParams";

import DateTimeTag from "../common/DateTimeTag";
import FavoriteButtonWrapper from "../common/FavoriteButtonWrapper";
import ProgressBar from "../common/ProgressBar";

interface IMainCardContentProps {
  id: string;
  name: string;
  dateTime: dayjs.Dayjs;
  location: string;
  participantCount: number;
  capacity: number;
}

const MainCardContent = ({
  id,
  name,
  dateTime,
  location,
  participantCount,
  capacity,
}: IMainCardContentProps) => {
  const MIN_PARTICIPANT_COUNT = 5; //모임의 최소 인원 수
  const isConfirmed = participantCount > MIN_PARTICIPANT_COUNT; //모임 개설 확정 여부
  const progressPercentage = (participantCount / capacity) * 100; //전체 모임 정원 중 모임 참여자의 비율

  return (
    <div className="flex w-full flex-col items-center justify-center gap-7 p-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start justify-center gap-2">
          <div className="flex items-center justify-center">
            <p className="max-h-[30px] max-w-[190px] overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold text-gray-800 md:max-w-[300px]">
              {name}
            </p>
            <RxDividerVertical className="text-gray-900" />
            <span className="ml-[3px] min-w-16 text-sm text-gray-700">
              {location === ONLINE.location ? "온라인" : location}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <DateTimeTag date={dateTime} />
          </div>
        </div>
        <FavoriteButtonWrapper id={id} />
      </div>
      <div className="flex w-full items-center gap-6">
        <div className="flex flex-1 flex-col items-start gap-2 md:w-[258px] lg:w-[258px]">
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center justify-center gap-0.5 text-gray-700">
              <IoMdPerson size={16} />
              <span className="text-sm">
                {participantCount}/{capacity}
              </span>
            </div>
            {isConfirmed && (
              <div className="flex items-center justify-center gap-[7px] text-purple-500">
                <FaCircleCheck />
                <span className="text-sm">{"개설확정"}</span>
              </div>
            )}
          </div>
          <ProgressBar progress={progressPercentage} />
        </div>
        <div className="flex items-center justify-center gap-2 text-purple-500">
          <span className="font-semibold">{"join now"}</span>
          <FaArrowRight />
        </div>
      </div>
    </div>
  );
};

export default MainCardContent;
