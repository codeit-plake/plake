import FavoriteBanner from "./_components/FavoriteBanner";
import FavoriteFilterTab from "./_components/FavoriteFilterTab";

const GatheringFavoriteLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="base-wrap bg-gray-50 py-6 md:py-10 xl:px-28">
      <FavoriteBanner />
      <div className="mt-8 flex justify-between">
        <FavoriteFilterTab />
      </div>
      <hr className="my-4 border-gray-200" />
      {children}
    </div>
  );
};

export default GatheringFavoriteLayout;
