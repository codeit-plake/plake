import clsx from "clsx";

import { Button } from "@/components/ui/Button";
import { SUB_SERVICE_LIST } from "@/constants/gathering";

interface ISubServiceSelectorProps {
  selectedSubService?: string;
  onClickTab: (value: string) => void;
}

const SubServiceSelector = ({
  selectedSubService,
  onClickTab,
}: ISubServiceSelectorProps) => {
  return (
    <div className="flex w-full gap-2">
      {SUB_SERVICE_LIST.OFFLINE.map(subService => (
        <Button
          type="button"
          className={clsx(
            "w-full bg-gray-200 text-sm font-medium text-gray-900 hover:bg-opacity-90",
            selectedSubService === subService.value && "bg-gray-900 text-white",
          )}
          variant="default"
          key={subService.value}
          onClick={() => onClickTab(subService.value)}
        >
          {subService.name}
        </Button>
      ))}
    </div>
  );
};

export default SubServiceSelector;
