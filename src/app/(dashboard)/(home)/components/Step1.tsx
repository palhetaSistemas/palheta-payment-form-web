"use client";

import { useFormContext } from "@/src/context/Contex";
import { maskCpfCnpj } from "@/src/lib/masks";

export function Step1() {
  const { formData, setFormData } = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <label className="text-default-600 w-max font-semibold text-sm">
          Seu CNPJ ou CPF*
        </label>
        <input
          className="w-full rounded-xl border-2 border-[#123262] h-12 px-4 focus:outline-none placeholder:text-default-400"
          placeholder="000.000.000-00"
          onChange={(e) =>
            setFormData({ ...formData, cpfCnpj: maskCpfCnpj(e.target.value) })
          }
          value={formData.cpfCnpj}
          maxLength={18}
        />
      </div>
    </div>
  );
}
