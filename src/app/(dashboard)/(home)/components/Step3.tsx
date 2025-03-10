"use client";
import { useFormContext } from "@/src/context/Contex";
import { cn } from "@/src/lib/utils";

export function Step3() {
  const { formData, setFormData } = useFormContext();

  return (
    <>
      <span className="font-bold text-lg text-[#123262] w-max mx-auto">
        QUAL SEU OBJETIVO?
      </span>
      <div className="flex flex-col gap-4">
        <label className="text-default-600 w-max font-semibold text-sm">
          Selecione abaixo*:
        </label>
        <label
          onClick={() => {
            if (formData.objective === 0) {
              setFormData({ ...formData, objective: null });
            } else {
              setFormData({ ...formData, objective: 0 });
            }
          }}
          className={cn(
            "w-full flex items-center gap-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
            formData.objective === 0 && "border-[#123262] shadow-lg"
          )}
        >
          <div
            className={cn(
              "w-5 h-5 border rounded-full flex items-center justify-center",
              formData.objective === 0 && "border-none"
            )}
          >
            <div
              className={cn(
                "opacity-0 w-4 h-4 rounded-full bg-[#123262] transition duration-150",
                formData.objective === 0 && "opacity-100"
              )}
            />
          </div>
          <span className="text-[#123262] text-bold text-xs">
            TENHO UM TERRENO E QUERO CONSTRUIR UMA IGREJA.
          </span>
        </label>
        <label
          onClick={() => {
            if (formData.objective === 1) {
              setFormData({ ...formData, objective: null });
            } else {
              setFormData({ ...formData, objective: 1 });
            }
          }}
          className={cn(
            "w-full flex items-center gap-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
            formData.objective === 1 && "border-[#123262] shadow-lg"
          )}
        >
          <div
            className={cn(
              "w-5 h-5 border rounded-full flex items-center justify-center",
              formData.objective === 1 && "border-none"
            )}
          >
            <div
              className={cn(
                "opacity-0 w-4 h-4 rounded-full bg-[#123262] transition duration-150",
                formData.objective === 1 && "opacity-100"
              )}
            />
          </div>
          <span className="text-[#123262] text-bold text-xs">
            QUERO REFORMAR A FACHADA E AS PARTES INTERNAS.
          </span>
        </label>
        <label
          onClick={() => {
            if (formData.objective === 2) {
              setFormData({ ...formData, objective: null });
            } else {
              setFormData({ ...formData, objective: 2 });
            }
          }}
          className={cn(
            "w-full flex items-center gap-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
            formData.objective === 2 && "border-[#123262] shadow-lg"
          )}
        >
          <div
            className={cn(
              "w-5 h-5 border rounded-full flex items-center justify-center",
              formData.objective === 2 && "border-none"
            )}
          >
            <div
              className={cn(
                "opacity-0 w-4 h-4 rounded-full bg-[#123262] transition duration-150",
                formData.objective === 2 && "opacity-100"
              )}
            />
          </div>
          <span className="text-[#123262] text-bold text-xs">
            QUERO REFORMAR SOMENTE A FACHADA.
          </span>
        </label>
        <label
          onClick={() => {
            if (formData.objective === 3) {
              setFormData({ ...formData, objective: null });
            } else {
              setFormData({ ...formData, objective: 3 });
            }
          }}
          className={cn(
            "w-full flex items-center gap-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
            formData.objective === 3 && "border-[#123262] shadow-lg"
          )}
        >
          <div
            className={cn(
              "w-5 h-5 border rounded-full flex items-center justify-center",
              formData.objective === 3 && "border-none"
            )}
          >
            <div
              className={cn(
                "opacity-0 w-4 h-4 rounded-full bg-[#123262] transition duration-150",
                formData.objective === 3 && "opacity-100"
              )}
            />
          </div>
          <span className="text-[#123262] text-bold text-xs">
            QUERO REFORMAR SOMENTE AS PARTES INTERNAS.
          </span>
        </label>
        <label
          onClick={() => {
            if (formData.objective === 4) {
              setFormData({ ...formData, objective: null });
            } else {
              setFormData({ ...formData, objective: 4 });
            }
          }}
          className={cn(
            "w-full flex items-center gap-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
            formData.objective === 4 && "border-[#123262] shadow-lg"
          )}
        >
          <div
            className={cn(
              "w-5 h-5 border rounded-full flex items-center justify-center",
              formData.objective === 4 && "border-none"
            )}
          >
            <div
              className={cn(
                "opacity-0 w-4 h-4 rounded-full bg-[#123262] transition duration-150",
                formData.objective === 4 && "opacity-100"
              )}
            />
          </div>
          <span className="text-[#123262] text-bold text-xs">
            AINDA NÃO TENHO UM TERRENO, MAS QUERO SABER MAIS SOBRE SEU TRABALHO.
          </span>
        </label>
        <label
          onClick={() => {
            if (formData.objective === 5) {
              setFormData({ ...formData, objective: null });
            } else {
              setFormData({ ...formData, objective: 5 });
            }
          }}
          className={cn(
            "w-full flex items-center gap-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
            formData.objective === 5 && "border-[#123262] shadow-lg"
          )}
        >
          <div
            className={cn(
              "w-5 h-5 border rounded-full flex items-center justify-center",
              formData.objective === 5 && "border-none"
            )}
          >
            <div
              className={cn(
                "opacity-0 w-4 h-4 rounded-full bg-[#123262] transition duration-150",
                formData.objective === 5 && "opacity-100"
              )}
            />
          </div>
          <span className="text-[#123262] text-bold text-xs">
            TENHO UMA CONSTRUÇÃO E QUERO UM PROJETO PARA FINALIZAR.
          </span>
        </label>
      </div>
    </>
  );
}
