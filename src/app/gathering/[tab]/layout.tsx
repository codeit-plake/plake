import { Suspense } from "react";

import GatheringFilterSort from "@/components/common/GatheringFilterSort";

import GatheringFiltertab from "../[tab]/_components/GatheringFilterTab";
import Banner from "./_components/Banner";
import CreateGatheringModalWrapper from "./_components/CreateGatheringModalWrapper";

const GatheringLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="base-wrap bg-gray-50 py-6 md:py-10 xl:px-28">
        <Banner />
        <div className="mt-8 flex justify-between">
          <Suspense>
            <GatheringFiltertab />
          </Suspense>
          <CreateGatheringModalWrapper />
        </div>
        <hr className="my-4 border-gray-200" />
        <GatheringFilterSort />
        {children}
      </div>
    </>
  );
};

export default GatheringLayout;
