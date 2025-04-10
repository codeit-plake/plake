import Image from "next/image";

const Banner = () => {
  return (
    <div className="mt-10 flex items-center">
      <div className="mr-14 flex items-center gap-[17px]">
        <Image
          src="/images/banner_introduce.png"
          width={72}
          height={72}
          alt="기본 소개 배너"
        />
        <div>
          <p className="text-sm">{"함께 할 사람이 없나요?"}</p>
          <p className="text-lg font-bold text-[#292929] md:text-xl">
            {"지금 모임에 참여해보세요"}
          </p>
        </div>
      </div>
      <Image
        className="hidden lg:block"
        src="/images/banner_main.png"
        width={420}
        height={144}
        alt="배너 메인 이미지"
      ></Image>
    </div>
  );
};

export default Banner;
