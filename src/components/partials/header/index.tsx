"use client";
import React from "react";
import { cn } from "@/src/lib/utils";
import ThemeButton from "./theme-button";
import { useSidebar, useThemeStore } from "@/src/store";
import ProfileInfo from "./profile-info";
import VerticalHeader from "./vertical-header";
import HorizontalHeader from "./horizontal-header";
import Inbox from "./inbox";
import HorizontalMenu from "./horizontal-menu";
import NotificationMessage from "./notification-message";

import Language from "./language";
import { useMediaQuery } from "@/src/hooks/use-media-query";
import MobileMenuHandler from "./mobile-menu-handler";
import ClassicHeader from "./layout/classic-header";
import FullScreen from "./full-screen";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
const NavTools = ({
  isDesktop,
  isMobile,
  sidebarType,
}: {
  isDesktop: boolean;
  isMobile: boolean;
  sidebarType: string;
}) => {
  return (
    <div className="nav-tools flex items-center  gap-2">
      {/* {isDesktop && <Language />}
      {isDesktop && <FullScreen />} */}

      {/* <ThemeButton /> */}
      {/* <Inbox /> */}
      {/* <NotificationMessage /> */}

      <div className="ltr:pl-2 rtl:pr-2 flex items-center gap-2">
        <ProfileInfo />
        <LogOut
          className="cursor-pointer"
          onClick={() => {
            if (confirm("Tem certeza que deseja sair?")) {
              signOut();
            }
          }}
        />
      </div>
      {!isDesktop && sidebarType !== "module" && <MobileMenuHandler />}
    </div>
  );
};
const Header = ({
  handleOpenSearch,
  trans,
}: {
  handleOpenSearch: () => void;
  trans: string;
}) => {
  const { setSidebarType } = useSidebar();
  const { layout, navbarType } = useThemeStore();

  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const isMobile = useMediaQuery("(min-width: 768px)");

  console.log("layout: ", layout);

  // set header style to classic if isDesktop
  React.useEffect(() => {
    if (!isDesktop && layout === "horizontal") {
      setSidebarType("classic");
    }
  }, [isDesktop]);

  return (
    <ClassicHeader
      className={cn(" ", {
        "sticky top-0 z-50": navbarType === "sticky",
      })}
    >
      <div className="w-full bg-card/90 backdrop-blur-lg md:px-6 px-[15px] py-3 border-b">
        <div className="flex justify-between items-center h-full">
          <HorizontalHeader handleOpenSearch={handleOpenSearch} />
          <NavTools
            isDesktop={isDesktop}
            isMobile={isMobile}
            sidebarType="horizontal"
          />
        </div>
      </div>
      {isDesktop && (
        <div className=" bg-card bg-card/90 backdrop-blur-lg  w-full px-6  shadow-md">
          <HorizontalMenu trans={trans} />
        </div>
      )}
    </ClassicHeader>
  );
};

export default Header;
