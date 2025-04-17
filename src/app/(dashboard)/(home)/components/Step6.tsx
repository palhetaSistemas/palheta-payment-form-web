"use client";

import { useFormContext } from "@/src/context/Contex";

export function Step6() {
  const { formData, setFormData } = useFormContext();

  return (
    <>
      <span className="font-bold text-lg text-[#123262] mx-auto w-max">
        CONTRATO
      </span>
      <div className="w-full h-[600px] bg-default-300 rounded-lg">
        <></>
      </div>
    </>
  );
}
