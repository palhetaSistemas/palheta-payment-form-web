import { cn } from "@/src/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FormSheet } from "./FormSheet";

export function StartView() {
  const [openFormSheet, setOpenFormSheet] = useState(false);
  const [isIphone, setIsIphone] = useState(false);
  let isIphonee = navigator.userAgent.includes("iPhone");
  useEffect(() => {
    if (isIphonee) setIsIphone(true);
  }, [isIphonee]);
  return (
    <>
      <div
        className={cn(
          "flex w-11/12 flex-col gap-8 h-full my-auto -translate-y-1/4 justify-center transition duration-700",
          openFormSheet && "-translate-y-full"
        )}
      >
        <Image
          src="/images/logo/logo-white.png"
          alt=""
          width={400}
          height={1200}
          className="w-24 h-40 mx-auto object-contain"
          quality={100}
        />
        <div
          className={cn(
            "flex flex-col transition duration-700 gap-2",
            openFormSheet && "opacity-0"
          )}
        >
          <span className="font-bold text-2xl text-center text-white">
            VAMOS AO TRABALHO
          </span>
          <span className="text-white text-center">
            PREENCHA O CONTRATO PARA INICIARMOS O TRABALHO
          </span>
        </div>
      </div>
      <button
        onClick={() => setOpenFormSheet(true)}
        className={` absolute ${
          isIphone ? "bottom-40" : "bottom-10"
        }  mx-auto w-11/12 h-12 bg-white border border-[#123262] text-[#123262] font-bold text-lg rounded-lg `}
      >
        COMEÇAR
      </button>
      <FormSheet open={openFormSheet} setOpen={setOpenFormSheet} />
    </>
  );
}
