"use client";
import React from "react";
import Header from "@/src/components/partials/header";
import Sidebar from "@/src/components/partials/sidebar";
import { cn } from "@/src/lib/utils";
import { useSidebar, useThemeStore } from "@/src/store";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import Footer from "@/src/components/partials/footer";
import { useMediaQuery } from "@/src/hooks/use-media-query";
import ThemeCustomize from "@/src/components/partials/customizer/theme-customizer";
import MobileSidebar from "@/src/components/partials/sidebar/mobile-sidebar";
import HeaderSearch from "@/src/components/header-search";
import { useMounted } from "@/src/hooks/use-mounted";
import LayoutLoader from "@/src/components/layout-loader";
const DashBoardLayoutProvider = ({
  children,
  trans,
}: {
  children: React.ReactNode;
  trans: any;
}) => {
  const [open, setOpen] = React.useState(false);
  const location = usePathname();
  const isMobile = useMediaQuery("(min-width: 768px)");
  const mounted = useMounted();
  if (!mounted) {
    return <LayoutLoader />;
  }

  return (
    <>
      <Header handleOpenSearch={() => setOpen(true)} trans={trans} />

      <div className={cn("content-wrapper transition-all duration-150 ")}>
        <div
          className={cn("  pt-6 px-6 pb-8  page-min-height-horizontal ", {})}
        >
          <LayoutWrapper
            isMobile={isMobile}
            setOpen={setOpen}
            open={open}
            location={location}
            trans={trans}
          >
            {children}
          </LayoutWrapper>
        </div>
      </div>
      {/* <Footer handleOpenSearch={() => setOpen(true)} /> */}
      {/* <ThemeCustomize /> */}
    </>
  );
};

export default DashBoardLayoutProvider;

const LayoutWrapper = ({
  children,
  setOpen,
  open,
  location,
  trans,
}: {
  children: React.ReactNode;
  isMobile: boolean;
  setOpen: any;
  open: boolean;
  location: any;
  trans: any;
}) => {
  return (
    <>
      <motion.div
        key={location}
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={{
          pageInitial: {
            opacity: 0,
            y: 50,
          },
          pageAnimate: {
            opacity: 1,
            y: 0,
          },
          pageExit: {
            opacity: 0,
            y: -50,
          },
        }}
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.5,
        }}
      >
        <main>{children}</main>
      </motion.div>

      <MobileSidebar trans={trans} className="left-[300px]" />
      <HeaderSearch open={open} setOpen={setOpen} />
    </>
  );
};
