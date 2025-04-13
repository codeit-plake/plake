import MyCardList from "@/app/mypage/_components/my-card-list/MyCardList";
import FetchBoundary from "@/components/boundary/FetchBoundary";
import LoadingDots from "@/components/common/LoadingDots";

const Page = async () => {
  return (
    <FetchBoundary fallback={<LoadingDots />}>
      <MyCardList />
    </FetchBoundary>
  );
};

export default Page;
