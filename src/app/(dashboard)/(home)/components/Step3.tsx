"use client";

import { useFormContext } from "@/src/context/Contex";
import { cn } from "@/src/lib/utils";
import { Check } from "lucide-react";

export function Step3() {
  const { formData, setFormData } = useFormContext();

  const toggleService = (service: string) => {
    const currentServices = formData.services || [];
    if (currentServices.includes(service)) {
      setFormData({
        ...formData,
        services: currentServices.filter((s) => s !== service),
      });
    } else {
      setFormData({
        ...formData,
        services: [...currentServices, service],
      });
    }
  };

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
            Selecione os serviços desejados *
          </label>
          <label
            onClick={() => toggleService("PROJETO ARQUITETÔNICO")}
            className={cn(
              "w-full flex items-center gap-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
              formData?.services?.includes("PROJETO ARQUITETÔNICO") &&
                "border-[#123262] shadow-lg"
            )}
          >
            <div
              className={cn(
                "w-5 h-5 border rounded flex items-center justify-center",
                formData?.services?.includes("PROJETO ARQUITETÔNICO") &&
                  "border-none"
              )}
            >
              <div
                className={cn(
                  "opacity-0 w-4 h-4 rounded border border-[#123262] transition duration-150 flex items-center ju",
                  formData?.services?.includes("PROJETO ARQUITETÔNICO") &&
                    "opacity-100"
                )}
              >
                {formData?.services?.includes("PROJETO ARQUITETÔNICO") && (
                  <Check color="#123262" />
                )}
              </div>
            </div>
            <span className="text-[#123262] text-bold">
              PROJETO ARQUITETÔNICO
            </span>
          </label>
          <label
            onClick={() => toggleService("3D E MÍDIAS PARA REDES SOCIAIS")}
            className={cn(
              "w-full flex items-center gap-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
              formData?.services?.includes("3D E MÍDIAS PARA REDES SOCIAIS") &&
                "border-[#123262] shadow-lg"
            )}
          >
            <div
              className={cn(
                "w-5 h-5 border rounded flex items-center justify-center",
                formData?.services?.includes(
                  "3D E MÍDIAS PARA REDES SOCIAIS"
                ) && "border-none"
              )}
            >
              <div
                className={cn(
                  "opacity-0 w-4 h-4 rounded border border-[#123262] transition duration-150 flex items-center ju",
                  formData?.services?.includes(
                    "3D E MÍDIAS PARA REDES SOCIAIS"
                  ) && "opacity-100"
                )}
              >
                {formData?.services?.includes(
                  "3D E MÍDIAS PARA REDES SOCIAIS"
                ) && <Check color="#123262" />}
              </div>
            </div>
            <span className="text-[#123262] text-bold">
              3D E MÍDIAS PARA REDES SOCIAIS
            </span>
          </label>
          <label
            onClick={() => toggleService("PROJETOS COMPLEMENTARES")}
            className={cn(
              "w-full flex items-center gap-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
              (formData.services || []).includes("PROJETOS COMPLEMENTARES") &&
                "border-[#123262] shadow-lg"
            )}
          >
            <div
              className={cn(
                "w-5 h-5 border rounded flex items-center justify-center",
                formData?.services?.includes("PROJETOS COMPLEMENTARES") &&
                  "border-none"
              )}
            >
              <div
                className={cn(
                  "opacity-0 w-4 h-4 rounded border border-[#123262] transition duration-150 flex items-center justify-center",
                  formData?.services?.includes("PROJETOS COMPLEMENTARES") &&
                    "opacity-100"
                )}
              >
                {formData?.services?.includes("PROJETOS COMPLEMENTARES") && (
                  <Check color="#123262" />
                )}
              </div>
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
