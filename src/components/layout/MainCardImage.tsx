import dayjs from "dayjs";
import Image from "next/image";

import DeadlineTag from "../common/DeadlineTag";

interface IMainCardImageProps {
  image: string | null;
  name: string;
  registrationEnd: dayjs.Dayjs;
}

const MainCardImage = ({
  image,
  name,
  registrationEnd,
}: IMainCardImageProps) => {
  return (
    <div className="relative h-[156px] w-full min-w-[280px] md:w-[280px] lg:w-[280px]">
      <Image
        src={image || "/images/gathering_default.jpeg"}
        alt={image ? name : "모임 기본 이미지"}
        className="h-full w-full object-cover"
        fill
        sizes="(max-width: 768px) 50vw"
      ></Image>
      <DeadlineTag registrationEnd={registrationEnd} />
    </div>
  );
};

export default MainCardImage;
