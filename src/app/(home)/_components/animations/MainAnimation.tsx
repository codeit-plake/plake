"use client";

import dynamic from "next/dynamic";
import { memo, useEffect, useState } from "react";

const Lottie = dynamic(() => import("lottie-light-react"), { ssr: false });

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
