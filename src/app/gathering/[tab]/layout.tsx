import { Suspense } from "react";

import GatheringFilterSort from "@/components/common/GatheringFilterSort";
import CreateGatheringModal from "@/components/modals/create-gathering-modal/CreateGatheringModal";
import FilterTab from "@/components/navigations/FilterTab";

import Banner from "./_components/Banner";
import CreateGatheringModalWrapper from "./_components/CreateGatheringModalWrapper";

const GatheringLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="base-wrap">
        <Banner />
        <div className="mt-8 flex justify-between">
          <Suspense>
            <FilterTab />
          </Suspense>
          <CreateGatheringModalWrapper />
        </div>
        <hr className="my-4 border-gray-200" />
        <GatheringFilterSort />
        {children}
        <CreateGatheringModal />
      </div>
    </>
  );
};

export default GatheringLayout;
