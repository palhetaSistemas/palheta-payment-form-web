"use client";

import Image from "next/image";

export function Step8() {
  return (
    <>
      <span className="font-bold text-lg text-[#123262] w-max mx-auto">
        ORÇAMENTO SOLICITADO
      </span>
      <div className="flex flex-col gap-4">
        <label className="text-default-600 w-full text-center font-semibold text-sm">
          Clique no botão abaixo para instalar o aplicativo Palheta Arquitetura
          e obter o seu orçamento, além de outros benefícios.
        </label>
        <div className="flex items-center justify-evenly">
          <Image
            onClick={() =>
              window.open(
                "https://apps.apple.com/br/app/palheta-arquitetura/id6751516461",
                "_blank"
              )
            }
            src="/appleP.png"
            alt=""
            width={500}
            height={250}
            className="h-14 w-max object-contain cursor-pointer"
          />
          <Image
            onClick={() =>
              window.open(
                "https://play.google.com/store/apps/details?id=com.palheta.palhetaapp&hl=pt_BR",
                "_blank"
              )
            }
            src="/googleP.png"
            alt=""
            width={500}
            height={250}
            className="h-14 w-max object-contain cursor-pointer"
          />
        </div>
      </div>
    </>
  );
}
