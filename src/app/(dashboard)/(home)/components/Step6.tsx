"use client";
import { useFormContext } from "@/src/context/Contex";
import { cn } from "@/src/lib/utils";

export function Step6() {
  const { formData, setFormData } = useFormContext();

  return (
    <>
      <span className="font-bold text-lg text-[#123262]">Quantas Parcelas</span>

      <div className="flex flex-col  gap-4">
        <label className="text-default-600 w-max font-semibold text-sm">
          Selecione abaixo*:
        </label>
        <div className="max-h-[50vh] h-[50vh] flex flex-col gap-4 overflow-y-auto">
          {[...Array(24)].map((_, index) => (
            <label
              key={index}
              onClick={() => {
                if (formData.installmentCount === index + 1) {
                  setFormData({ ...formData, installmentCount: null });
                } else {
                  setFormData({ ...formData, installmentCount: index + 1 });
                }
              }}
              className={cn(
                "w-full flex items-center gap-2 rounded-xl border-2 h-12 min-h-[48px] px-4 relative transition duration-150",
                formData.installmentCount === index + 1 &&
                  "border-[#123262] shadow-lg"
              )}
            >
              <div
                className={cn(
                  "w-5 h-5 border rounded-full flex items-center justify-center",
                  formData.installmentCount === index + 1 && "border-none"
                )}
              >
                <div
                  className={cn(
                    "opacity-0 w-4 h-4 rounded-full bg-[#123262] transition duration-150",
                    formData.installmentCount === index + 1 && "opacity-100"
                  )}
                />
              </div>
              <span className="text-[#123262] text-bold">{index + 1}x</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
}
