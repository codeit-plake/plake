import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

import DateTimeTag from "@/components/common/DateTimeTag";
import { IGathering } from "@/types/gathering";

interface IMainCarouselItemProps {
  gathering: IGathering;
}

const MainCarouselItem = ({ gathering }: IMainCarouselItemProps) => {
  return (
    <Link
      href={`/gathering/detail/${gathering.id}`}
      className="flex flex-col gap-2"
    >
      <div className="relative h-[150px] overflow-hidden rounded-lg md:h-[200px] lg:h-[250px]">
        <Image
          src={gathering.image || "/images/gathering_default.png"}
          alt="carousel-item"
          fill
          sizes="(max-width: 768px) 150px, (max-width: 1024px) 240px, 260px"
          className="object-cover transition-all duration-300 hover:scale-110"
        />
      </div>
      <p className="line-clamp-1 font-medium text-gray-900">{gathering.name}</p>
      <p className="text-sm text-gray-500">{gathering.location}</p>
      <DateTimeTag date={dayjs(gathering.dateTime)} />
    </Link>
  );
};

export default MainCarouselItem;
