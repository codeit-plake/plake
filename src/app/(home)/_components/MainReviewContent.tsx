import Image from "next/image";

import InViewSlide from "@/components/ui/InViewSlide";
import { mainReviewList } from "@/constants/review";

import MainReviewItem from "./MainReviewItem";

const MainReviewContent = () => {
  return (
    <section className="flex flex-col justify-center gap-12">
      <InViewSlide direction="bottom">
        <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={130}
            height={60}
            sizes="130px"
          />
          <p className="gap-2 text-center text-3xl font-bold">
            {"회원들의 생생한 후기"}
          </p>
        </div>
      </InViewSlide>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {mainReviewList.map(review => (
          <InViewSlide direction="bottom" key={review.id}>
            <MainReviewItem review={review} />
          </InViewSlide>
        ))}
      </div>
    </section>
  );
};

export default MainReviewContent;
