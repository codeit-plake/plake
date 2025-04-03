import Image from "next/image";

const FavoriteBanner = () => {
  return (
    <section className="mb-8 mt-10 flex items-center gap-2">
      <Image
        priority
        src="/images/favorite_head.png"
        alt="review-head"
        width={72}
        height={72}
      />
      <div>
        <h1 className="mb-2 text-lg font-semibold text-gray-900 md:text-2xl">
          {"찜한 모임"}
        </h1>
        <p className="text-sm font-medium text-gray-700">
          {"마감되기 전에 지금 바로 참여해보세요 👀"}
        </p>
      </div>
    </section>
  );
};

export default FavoriteBanner;
