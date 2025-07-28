"use client";
import darkImage from "@/public/images/error/dark-404.png";
import lightImage from "@/public/images/error/light-404.png";
import { useTheme } from "next-themes";
import Image from "next/image";
const ErrorBlock = () => {
  const { theme } = useTheme();
  return (
    <div className="min-h-screen  overflow-y-auto flex justify-center items-center p-10">
      <div className="w-full flex flex-col items-center">
        <div className="max-w-[740px]">
          <Image
            src={theme === "dark" ? darkImage : lightImage}
            alt="error image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-16 text-center">
          <div className="text-2xl md:text-4xl lg:text-5xl font-semibold text-white">
            Ops! Página não encontrada
          </div>
          <div className="mt-3 text-white text-sm md:text-base">
            Verifique a URL enviada pela nossa Equipe e tente novamente
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorBlock;
