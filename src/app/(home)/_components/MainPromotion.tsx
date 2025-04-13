import clsx from "clsx";
import dynamic from "next/dynamic";
import Link from "next/link";

import { Button } from "@/components/ui/Button";

const MainAnimation = dynamic(() => import("./animations/MainAnimation"), {
  ssr: false,
});

interface IMainPromotionProps {
  type: "offline" | "online";
}

const MainPromotion = ({ type }: IMainPromotionProps) => {
  return (
    <section
      className={clsx(
        "flex w-full flex-col gap-24 md:gap-0",
        type === "offline" ? "md:flex-row" : "md:flex-row-reverse",
      )}
    >
      <div className="flex items-center justify-center overflow-hidden rounded-2xl md:h-[600px]">
        {type === "offline" ? (
          <MainAnimation type="offline" />
        ) : (
          <MainAnimation type="online" />
        )}
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-14 whitespace-pre-wrap text-center text-3xl font-bold leading-[50px] md:text-4xl md:font-extrabold md:leading-[60px]">
        {type === "offline" ? (
          <p>{"많은 사람들과 모여 \n 시간을 보내고 싶으신가요?"}</p>
        ) : (
          <p>{"원하는 주제의 모임을 \n 집에서 편하게 즐겨보세요"}</p>
        )}
        <Link href={`/gathering/${type}`}>
          <Button
            variant="purple"
            className="px-12 py-8 text-2xl font-bold"
            aria-label={`${type} 모임 찾아보기`}
          >
            {type === "offline"
              ? "오프라인 모임 찾아보기"
              : "온라인 모임 찾아보기"}
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default MainPromotion;
