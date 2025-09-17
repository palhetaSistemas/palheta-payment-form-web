"use client";
import ErrorBlock from "@/src/components/error-block";
import { ApiContextProvider } from "@/src/context/ApiContext";
import Lenis from "lenis";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { StartView } from "./components/StartView";

export default function Dashboard() {
  const params = useSearchParams();

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  if (
    params.get("proposalId") === null ||
    params.get("proposalId") === "" ||
    params.get("clientId") === null ||
    params.get("clientId") === ""
  ) {
    return <ErrorBlock />;
  } else {
    return (
      <div className="bg-[#123262] lg:bg-[#07234E] p-2 relative flex w-full lg:w-[500px] lg:mx-auto items-center flex-col min-h-screen max-h-screen">
        <ApiContextProvider>
          <StartView />
        </ApiContextProvider>
      </div>
    );
  }
}
