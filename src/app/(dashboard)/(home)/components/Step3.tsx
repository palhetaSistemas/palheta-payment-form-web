"use client";

import { useFormContext } from "@/src/context/Contex";
import { cn } from "@/src/lib/utils";

export function Step3() {
  const { formData, setFormData } = useFormContext();

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-2">
        <span className="font-bold text-lg text-[#123262]">
          DADOS PARA APLICATIVO
        </span>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-default-600 w-max font-semibold text-sm">
              E-Mail*
            </label>
            <input
              className="w-full rounded-xl border-2 border-[#123262] h-12 px-4 focus:outline-none placeholder:text-default-400"
              placeholder="INSIRA SEU EMAIL"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
              type="email"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-bold text-lg text-[#123262]">SERVIÇOS</span>
        <div className="flex flex-col gap-4">
          <label className="text-default-600 w-max font-semibold text-sm">
            Selecione abaixo*
          </label>
          <label
            onClick={() => {
              if (formData.service === "PROJETO ARQUITETÔNICO") {
                setFormData({ ...formData, service: null });
              } else {
                setFormData({ ...formData, service: "PROJETO ARQUITETÔNICO" });
              }
            }}
            className={cn(
              "w-full flex items-center gap-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
              formData.service === "PROJETO ARQUITETÔNICO" &&
                "border-[#123262] shadow-lg"
            )}
          >
            <div
              className={cn(
                "w-5 h-5 border rounded-full flex items-center justify-center",
                formData.service === "PROJETO ARQUITETÔNICO" && "border-none"
              )}
            >
              <div
                className={cn(
                  "opacity-0 w-4 h-4 rounded-full bg-[#123262] transition duration-150",
                  formData.service === "PROJETO ARQUITETÔNICO" && "opacity-100"
                )}
              />
            </div>
            <span className="text-[#123262] text-bold">
              PROJETO ARQUITETÔNICO
            </span>
          </label>
          <label
            onClick={() => {
              if (formData.service === "3D E MÍDIAS PARA REDES SOCIAIS") {
                setFormData({ ...formData, service: null });
              } else {
                setFormData({
                  ...formData,
                  service: "3D E MÍDIAS PARA REDES SOCIAIS",
                });
              }
            }}
            className={cn(
              "w-full flex items-center gap-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
              formData.service === "3D E MÍDIAS PARA REDES SOCIAIS" &&
                "border-[#123262] shadow-lg"
            )}
          >
            <div
              className={cn(
                "w-5 h-5 border rounded-full flex items-center justify-center",
                formData.service === "3D E MÍDIAS PARA REDES SOCIAIS" &&
                  "border-none"
              )}
            >
              <div
                className={cn(
                  "opacity-0 w-4 h-4 rounded-full bg-[#123262] transition duration-150",
                  formData.service === "3D E MÍDIAS PARA REDES SOCIAIS" &&
                    "opacity-100"
                )}
              />
            </div>
            <span className="text-[#123262] text-bold">
              3D E MÍDIAS PARA REDES SOCIAIS
            </span>
          </label>
          <label
            onClick={() => {
              if (formData.service === "PROJETOS COMPLEMENTARES") {
                setFormData({ ...formData, service: null });
              } else {
                setFormData({
                  ...formData,
                  service: "PROJETOS COMPLEMENTARES",
                });
              }
            }}
            className={cn(
              "w-full flex items-center gap-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
              formData.service === "PROJETOS COMPLEMENTARES" &&
                "border-[#123262] shadow-lg"
            )}
          >
            <div
              className={cn(
                "w-5 h-5 border rounded-full flex items-center justify-center",
                formData.service === "PROJETOS COMPLEMENTARES" && "border-none"
              )}
            >
              <div
                className={cn(
                  "opacity-0 w-4 h-4 rounded-full bg-[#123262] transition duration-150",
                  formData.service === "PROJETOS COMPLEMENTARES" &&
                    "opacity-100"
                )}
              />
            </div>
            <span className="text-[#123262] text-bold">
              PROJETOS COMPLEMENTARES
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
