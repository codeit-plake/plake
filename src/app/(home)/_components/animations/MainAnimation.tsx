"use client";

import dynamic from "next/dynamic";
import { memo } from "react";

import offlineAnimation from "@/assets/animations/offline.json";
import onlineAnimation from "@/assets/animations/online.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface IMainAnimationProps {
  type: "online" | "offline";
}

const MainAnimation = memo(({ type }: IMainAnimationProps) => {
  return (
    <Lottie
      animationData={type === "online" ? onlineAnimation : offlineAnimation}
      rendererSettings={{
        preserveAspectRatio: "xMidYMid slice",
      }}
      style={{ maxWidth: "500px" }}
    />
  );
});

MainAnimation.displayName = "MainAnimation";

export default MainAnimation;
