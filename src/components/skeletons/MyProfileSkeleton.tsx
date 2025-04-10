import { Skeleton } from "@/components/ui/Skeleton";

const MyProfileSkeleton = () => {
  return (
    <div
      data-testid="profile-skeleton"
      className="flex h-[109px] gap-3 bg-white px-6"
    >
      <div className="mt-[-16px]">
        <div className="relative h-14 w-14 overflow-hidden rounded-full bg-white">
          <Skeleton className="absolute h-full w-full" />
        </div>
      </div>
      <div>
        <Skeleton className="mb-3 mt-1 h-[22px] w-[120px]" />
        <div className="flex w-full flex-col space-y-1.5">
          <Skeleton className="h-[18px] w-[144px]" />
          <Skeleton className="h-[18px] w-[210px]" />
        </div>
      </div>
    </div>
  );
};

export default MyProfileSkeleton;
