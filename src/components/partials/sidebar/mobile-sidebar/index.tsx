"use client";
import React, { useState } from "react";
import { cn, isLocationMatch } from "@/src/lib/utils";
import { useSidebar, useThemeStore } from "@/src/store";
import SidebarLogo from "../common/logo";
import { menusConfig } from "@/src/config/menus";
import MenuLabel from "../common/menu-label";
import { Separator } from "@/src/components/ui/separator";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import SingleMenuItem from "./single-menu-item";
import SubMenuHandler from "./sub-menu-handler";
import NestedSubMenu from "../common/nested-menus";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
const MobileSidebar = ({
  className,
  trans,
}: {
  className?: string;
  trans: any;
}) => {
  const { sidebarBg, mobileMenu, setMobileMenu } = useSidebar();
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [activeMultiMenu, setMultiMenu] = useState<number | null>(null);
  const menus = menusConfig.mainNav || [];
  const { collapsed } = useSidebar();
  const path = usePathname();

  const toggleSubmenu = (i: number) => {
    if (activeSubmenu === i) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(i);
    }
  };

  const toggleMultiMenu = (subIndex: number) => {
    if (activeMultiMenu === subIndex) {
      setMultiMenu(null);
    } else {
      setMultiMenu(subIndex);
    }
  };
  const locationName = usePathname();

  React.useEffect(() => {
    let subMenuIndex = null;
    let multiMenuIndex = null;
    menus?.map((item: any, i: number) => {
      if (item?.child) {
        item.child.map((childItem: any, j: number) => {
          if (isLocationMatch(childItem.href, locationName)) {
            subMenuIndex = i;
          }
          if (childItem?.multi_menu) {
            childItem.multi_menu.map((multiItem: any, k: number) => {
              if (isLocationMatch(multiItem.href, locationName)) {
                subMenuIndex = i;
                multiMenuIndex = j;
              }
            });
          }
        });
      }
    });
    setActiveSubmenu(subMenuIndex);
    setMultiMenu(multiMenuIndex);
    if (mobileMenu) {
      setMobileMenu(false);
    }
  }, [locationName]);
  return (
    <>
      <div
        className={cn(
          "fixed top-0  bg-card h-full w-[248px] z-[9999] ",
          className,
          {
            " -left-[300px] invisible opacity-0  ": !mobileMenu,
            " left-0 visible opacity-100  ": mobileMenu,
          }
        )}
      >
        {sidebarBg !== "none" && (
          <div
            className=" absolute left-0 top-0   z-[-1] w-full h-full bg-cover bg-center opacity-[0.07]"
            style={{ backgroundImage: `url(${sidebarBg})` }}
          ></div>
        )}
        <SidebarLogo hovered={collapsed} />
        <ScrollArea
          className={cn("sidebar-menu  h-[calc(100%-80px)] ", {
            "px-4": !collapsed,
          })}
        >
          {/* <ul
            className={cn("", {
              " space-y-2 text-center": collapsed,
            })}
          >
            {menus.map((item, i) => (
              <li key={`menu_key_${i}`}>

                {!item.child && !item.isHeader && (
                  <SingleMenuItem item={item} collapsed={collapsed} />
                )}

                {item.isHeader && !item.child && !collapsed && (
                  <MenuLabel item={item} trans={trans} />
                )}

                {item.child && (
                  <>
                    <SubMenuHandler
                      item={item}
                      toggleSubmenu={toggleSubmenu}
                      index={i}
                      activeSubmenu={activeSubmenu}
                      collapsed={collapsed}
                    />

                    {!collapsed && (
                      <NestedSubMenu
                        toggleMultiMenu={toggleMultiMenu}
                        activeMultiMenu={activeMultiMenu}
                        activeSubmenu={activeSubmenu}
                        item={item}
                        index={i}
                        title={""}
                        trans={undefined}
                      />
                    )}
                  </>
                )}
              </li>
            ))}
          </ul> */}
          {menus?.map((item: any, index: number) => (
            <div key={`item-${index}`}>
              <div className=" flex items-center">
                <div
                  className={twMerge([
                    " flex items-center gap-2 py-4 cursor-pointer group data-[state=open]:text-primary-300 px-6 w-full ",
                    path === item.route
                      ? "bg-gradient-to-r from-primary/5 from-0% to-100% via-primary/30 to-primary/5 backdrop-filter backdrop-blur border-b-2 border-primary-500 text-default-900"
                      : "text-default-500",
                  ])}
                >
                  <item.icon className="h-5 w-5 " />
                  <Link href={item.route}>
                    <span className="text-sm font-medium">{item.title}</span>
                  </Link>
                </div>
              </div>
              {path !== item.route && (
                <div
                  className={cn(
                    "w-full border-primary-300  rounded-md border bg-popover text-popover-foreground shadow-lg   "
                  )}
                />
              )}
            </div>
          ))}
        </ScrollArea>
      </div>
      {mobileMenu && (
        <div
          onClick={() => setMobileMenu(false)}
          className="overlay bg-black/60 backdrop-filter backdrop-blur-sm opacity-100 fixed inset-0 z-[999]"
        ></div>
      )}
    </>
  );
};

export default MobileSidebar;
