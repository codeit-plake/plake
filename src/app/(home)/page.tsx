import MainBanner from "./_components/MainBanner";
import MainContent from "./_components/MainContent";

export default function HomePage() {
  return (
    <div className="flex w-full flex-col gap-10">
      <MainBanner />
      <MainContent />
    </div>
  );
}
