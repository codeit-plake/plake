"use client";

import dynamic from "next/dynamic";
import { memo, useEffect, useState } from "react";

import LoadingSpinner from "@/components/common/LoadingSpinner";

const Lottie = dynamic(() => import("lottie-light-react"), {
  loading: () => (
    <div className="flex h-[450px] w-[500px] items-center justify-center bg-gray-200 sm:h-[600px] md:h-full">
      <LoadingSpinner size="lg" />
    </div>
  ),
  ssr: false,
});
interface IMainAnimationProps {
  type: "online" | "offline";
}

const MainAnimation = memo(({ type }: IMainAnimationProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    const loadAnimation = async () => {
      const data =
        type === "online"
          ? await fetch("/animations/online.json")
          : await fetch("/animations/offline.json");
      const json = await data.json();
      setAnimationData(json);
    };
    loadAnimation();
  }, [type]);

  if (!animationData) return null;

  return (
    <Lottie
      animationData={animationData}
      rendererSettings={{
        preserveAspectRatio: "xMidYMid slice",
      }}
      style={{ maxWidth: "500px" }}
    />
  );
});

MainAnimation.displayName = "MainAnimation";

export default MainAnimation;
