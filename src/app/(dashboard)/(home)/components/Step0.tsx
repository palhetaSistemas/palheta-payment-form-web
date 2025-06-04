"use client";

import { useFormContext } from "@/src/context/Contex";

export function Step0() {
  const { formData, setFormData } = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="font-bold text-lg text-[#123262]">
          DADOS PARA O CONTRATO
        </span>
      </div>
      <div className="flex flex-col">
        <label className="text-default-600 w-max font-semibold text-sm">
          Insira seu Nome / Razão Social*
        </label>
        <input
          className="w-full rounded-xl text-[16px] border-2 border-[#123262] h-12 px-4 focus:outline-none placeholder:text-default-400"
          placeholder="NOME / RAZÃO SOCIAL"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          value={formData.name}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-default-600 w-max font-semibold text-sm">
          E-Mail*
        </label>
        <input
          className="w-full rounded-xl text-[16px] border-2 border-[#123262] h-12 px-4 focus:outline-none placeholder:text-default-400"
          placeholder="INSIRA SEU EMAIL"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          value={formData.email}
          type="email"
        />
      </div>
    </div>
  );
}
