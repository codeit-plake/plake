import clsx from "clsx";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

import SubServiceSelector from "@/components/ui/SubServiceSelector";
import { SERVICE_LIST } from "@/constants/gathering";

interface ServiceSelectorProps {
  setTypeValue: (value: string) => void;
  setLocationValue: (value: string) => void;
}

const ServiceSelector = ({
  setTypeValue,
  setLocationValue,
}: ServiceSelectorProps) => {
  const [selectedService, setSelectedService] = useState<string>(
    SERVICE_LIST.OFFLINE.value,
  );
  const [selectedSubService, setSelectedSubService] = useState<string>("");

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;

    setSelectedService(id);

    if (id === SERVICE_LIST.ONLINE.value) {
      setLocationValue(SERVICE_LIST.ONLINE.location);
      setTypeValue(SERVICE_LIST.ONLINE.type);
      setSelectedSubService("");
    } else {
      setLocationValue("");
      setTypeValue("");
    }
  };

  const handleSubServiceChange = (value: string) => {
    setSelectedSubService(value);
    setTypeValue(value);
  };

  return (
    <>
      <div className="flex h-10 items-center">
        {Object.values(SERVICE_LIST).map(service => (
          <label
            key={service.value}
            className={clsx(
              "flex flex-1 cursor-pointer items-center gap-2 rounded-lg bg-gray-50 px-4 py-3",
              selectedService === service.value && "bg-gray-900",
            )}
          >
            <input
              type="radio"
              id={service.value}
              name="serviceType"
              onChange={handleServiceChange}
              checked={selectedService === service.value}
              className="peer relative h-4 w-4 appearance-none rounded-sm border border-gray-300 bg-white"
            />
            <div className="absolute hidden translate-x-[2px] peer-checked:block">
              <FaCheck size={12} className="text-purple-600" />
            </div>
            <span
              className={clsx(
                "text-base font-medium",
                selectedService === service.value && "text-white",
              )}
            >
              {service.name}
            </span>
          </label>
        ))}
      </div>
      {selectedService === SERVICE_LIST.OFFLINE.value && (
        <SubServiceSelector
          selectedSubService={selectedSubService}
          onClickTab={handleSubServiceChange}
        />
      )}
    </>
  );
};

export default ServiceSelector;
