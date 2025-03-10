import React, { useEffect } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { menusConfig } from "@/src/config/menus";
import { cn } from "@/src/lib/utils";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/router";

export default function MainMenu({ trans }: { trans: any }) {
  const menus = menusConfig.mainNav || [];
  const path = usePathname();
  const [offset, setOffset] = React.useState<number | null>(null);
  const [list, setList] = React.useState<HTMLUListElement | null | undefined>();
  const [value, setValue] = React.useState<string | null>();

  return (
    <div>
      <NavigationMenu.Root
        onValueChange={setValue}
        className=" flex relative justify-start group "
      >
        <NavigationMenu.List
          ref={setList}
          className="group flex list-none gap-2"
        >
          {menus?.map((item: any, index: number) => (
            <NavigationMenu.Item key={`item-${index}`} value={item}>
              <NavigationMenu.Trigger asChild className=" flex items-center">
                <Link href={item.route}>
                  <div
                    className={twMerge([
                      " flex items-center gap-2 py-4 cursor-pointer group data-[state=open]:text-primary-300 px-6  ",
                      path === item.route
                        ? "bg-gradient-to-r from-primary/5 from-0% to-100% via-primary/30 to-primary/5 backdrop-filter backdrop-blur border-t-2 border-primary-500 text-default-900"
                        : "text-default-500",
                    ])}
                  >
                    <item.icon className="h-5 w-5 " />
                    <span className="text-sm font-medium">{item.title}</span>
                  </div>
                </Link>
              </NavigationMenu.Trigger>
              {path !== item.route && (
                <NavigationMenu.Content
                  className={cn(
                    "w-full border-primary-300  rounded-md border bg-popover text-popover-foreground shadow-lg   "
                  )}
                />
              )}
            </NavigationMenu.Item>
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </div>
  );
}
