import { cn } from "@/lib/utils";

interface IMainTabProps {
  active: boolean;
  name: string;
}

const MainTab = ({ active, name }: IMainTabProps) => {
  return (
    <span
      className={cn(
        "relative pb-1.5 text-lg font-semibold text-gray-400",
        active &&
          "text-black after:absolute after:mt-1.5 after:block after:w-full after:border-b-2 after:border-gray-900 after:content-['']",
      )}
    >
      {name}
    </span>
  );
};

export default MainTab;
