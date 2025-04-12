import Image from "next/image";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { useShallow } from "zustand/shallow";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";
import useSideBarStore from "@/stores/useSideBarStore";
import useUserStore from "@/stores/useUserStore";

import Avatar from "../common/Avatar";
import NavList from "./NavList";

const SideBar = () => {
  const { isOpen, onToggleSideBar } = useSideBarStore();
  const { user } = useUserStore(useShallow(state => ({ user: state.user })));
  return (
    <Sheet open={isOpen} onOpenChange={onToggleSideBar}>
      <SheetTrigger
        onClick={() => onToggleSideBar(!isOpen)}
        aria-label="mobile-menu-button"
      >
        <RxHamburgerMenu
          size={20}
          color="black"
          className="absolute left-5 top-5 md:hidden"
        />
      </SheetTrigger>
      <SheetContent side={"left"} className="w-[200px] bg-white p-4">
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center justify-between">
              <Link href="/" onClick={() => onToggleSideBar(false)}>
                <Image
                  src="/images/logo.png"
                  alt="logo-image"
                  width={70}
                  height={15}
                />
              </Link>
              <Avatar type="default" size="default" imgPath={user?.image} />
            </div>
          </SheetTitle>
        </SheetHeader>
        <NavList />
        <SheetDescription>{""}</SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default SideBar;
