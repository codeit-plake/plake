import Image from "next/image";

import { reviewList } from "@/constants/review";

import MainReviewItem from "./MainReviewItem";

const MainReviewContent = () => {
  return (
    <section className="flex flex-col justify-center gap-12">
      <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
        <Image src="/images/logo.png" alt="logo" width={130} height={60} />
        <p className="gap-2 text-center text-3xl font-bold">
          {"회원들의 생생한 후기"}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {reviewList.map(review => (
          <MainReviewItem key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
};

export default MainReviewContent;
