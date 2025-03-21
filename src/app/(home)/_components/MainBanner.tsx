import Image from "next/image";

const MainBanner = () => {
  return (
    <section className="relative h-[50vh] w-full overflow-hidden md:h-[90vh]">
      <Image
        src="/images/main_banner.jpg"
        alt="main_banner"
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="base-wrap absolute bottom-0 left-0 right-0 flex h-full flex-col justify-end gap-5 p-10 px-5 text-3xl font-bold text-white md:py-28 md:text-5xl md:font-extrabold">
        <p>{"지친 일상을 잠시 멈추고"}</p>
        <p>
          {"함께 "}
          <span className="rounded-lg bg-black/40 px-4 py-2">{'"러닝"'}</span>
          {" 어떠세요?"}
        </p>
      </div>
    </section>
  );
};

export default MainBanner;
