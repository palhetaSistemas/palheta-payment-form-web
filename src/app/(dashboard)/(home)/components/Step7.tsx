"use client";
import { useFormContext } from "@/src/context/Contex";
import { cn } from "@/src/lib/utils";

export function Step7() {
  const { formData, setFormData } = useFormContext();

  return (
    <>
      <span className="font-bold text-lg text-[#123262] text-center mx-auto">
        VOCÊ JÁ FEZ ORÇAMENTO COM OUTROS PROFISSIONAIS?
      </span>
      <div className="flex flex-col gap-4">
        <label className="text-default-600 w-max font-semibold text-sm">
          Selecione abaixo*:
        </label>
        <label
          onClick={() => {
            if (formData.firstBudget) {
              setFormData({ ...formData, firstBudget: null });
            } else {
              setFormData({ ...formData, firstBudget: true });
            }
          }}
          className={cn(
            "w-full flex items-center gap-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
            formData.firstBudget && "border-[#123262] shadow-lg"
          )}
        >
          <div
            className={cn(
              "w-5 h-5 border rounded-full flex items-center justify-center",
              formData.firstBudget && "border-none"
            )}
          >
            <div
              className={cn(
                "opacity-0 w-4 h-4 rounded-full bg-[#123262] transition duration-150",
                formData.firstBudget && "opacity-100"
              )}
            />
          </div>
          <span className="text-[#123262] text-bold">SIM</span>
        </label>
        <label
          onClick={() => {
            if (formData.firstBudget === false) {
              setFormData({ ...formData, firstBudget: null });
            } else {
              setFormData({ ...formData, firstBudget: false });
            }
          }}
          className={cn(
            "w-full flex items-center gap-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
            formData.firstBudget === false && "border-[#123262] shadow-lg"
          )}
        >
          <div
            className={cn(
              "w-5 h-5 border rounded-full flex items-center justify-center",
              formData.firstBudget === false && "border-none"
            )}
          >
            <div
              className={cn(
                "opacity-0 w-4 h-4 rounded-full bg-[#123262] transition duration-150",
                formData.firstBudget === false && "opacity-100"
              )}
            />
          </div>
          <span className="text-[#123262] text-bold">NÃO</span>
        </label>
      </div>
    </>
  );
}
