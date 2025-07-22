import { cn } from "@/src/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FormSheet } from "./FormSheet";

export function StartView() {
  const [openFormSheet, setOpenFormSheet] = useState(false);
  const [isIphone, setIsIphone] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isIphonee = navigator.userAgent.includes("iPhone");
      if (isIphonee) setIsIphone(true);
    }
  }, []);

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
          {isCompleted ? (
            <>
              <span className="font-bold text-2xl text-center text-white">
                CONTRATO PREENCHIDO
              </span>
              <span className="text-white text-center">
                AGUARDE UM PRÓXIMO CONTATO PARA INICIARMOS O TRABALHO
              </span>
            </>
          ) : (
            <>
              <span className="font-bold text-2xl text-center text-white">
                VAMOS AO TRABALHO
              </span>
              <span className="text-white text-center">
                PREENCHA O CONTRATO PARA INICIARMOS O TRABALHO
              </span>
            </>
          )}
        </div>
      </div>
      <button
        onClick={() => setOpenFormSheet(true)}
        className={`${isCompleted && "hidden"} absolute ${
          isIphone ? "bottom-40" : "bottom-10"
        }  mx-auto w-11/12 h-12 bg-white border border-[#123262] text-[#123262] font-bold text-lg rounded-lg `}
      >
        COMEÇAR
      </button>
      <FormSheet
        open={openFormSheet}
        setOpen={setOpenFormSheet}
        isCompleted={isCompleted}
        setIsCompleted={setIsCompleted}
      />
    </>
  );
}
