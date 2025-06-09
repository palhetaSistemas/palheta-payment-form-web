"use client";

import { useFormContext } from "@/src/context/Contex";
import { useEffect, useState } from "react";

export function Step0() {
  const { formData, setFormData } = useFormContext();
  const [readyToShowInputs, setReadyToShowInputs] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReadyToShowInputs(true);
    }, 100); // ou tente 200ms

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex flex-col h-40 gap-4">
      <div className="flex flex-col">
        <label className="text-default-600 mb-4 w-max font-semibold text-sm">
          Insira seu Nome / Razão Social*
        </label>
        {readyToShowInputs && (
          <input
            className="w-full rounded-xl text-[16px] border-2 border-[#123262] h-12 px-4 focus:outline-none placeholder:text-default-400"
            placeholder="NOME / RAZÃO SOCIAL"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
          />
        )}
      </div>
    </div>
  );
}
