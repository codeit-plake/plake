"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { MY_REVIEW_TAB } from "@/constants/ui";
import { cn } from "@/lib/utils";

const ReviewTab = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const defaultTab =
    searchParams.get("type") === "written" ? "written" : "writable";
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (value: string) => {
    setActiveTab(value);

    if (value === "writable") {
      router.push(pathname, { scroll: false });
    } else {
      router.push(`${pathname}?type=${value}`, { scroll: false });
    }
  };

  return (
    <div className="mt-4 flex items-center gap-2">
      {MY_REVIEW_TAB.map(tab => (
        <Button
          key={tab.value}
          variant="default"
          role="tab"
          aria-label={tab.name}
          aria-selected={activeTab === tab.value}
          className={cn(
            "rounded-xl px-4 py-2.5",
            activeTab !== tab.value
              ? "bg-gray-200 text-black hover:bg-gray-200/90"
              : "bg-black text-white",
          )}
          onClick={() => handleTabClick(tab.value)}
        >
          {tab.name}
        </Button>
      ))}
    </div>
  );
};

export default ReviewTab;
