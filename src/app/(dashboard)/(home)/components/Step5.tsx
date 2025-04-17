"use client";
import { useFormContext } from "@/src/context/Contex";
import { cn } from "@/src/lib/utils";

export function Step5() {
  const { formData, setFormData } = useFormContext();

  return (
    <>
      <span className="font-bold text-lg text-[#123262]">
        QUAL A CAPACIDADE ESPERADA?
      </span>

      <div className="flex flex-col gap-4">
        <label className="text-default-600 w-max font-semibold text-sm">
          Selecione abaixo*:
        </label>
        <label
          onClick={() => {
            if (formData.expectedCapacity === 0) {
              setFormData({ ...formData, expectedCapacity: null });
            } else {
              setFormData({ ...formData, expectedCapacity: 0 });
            }
          }}
          className={cn(
            "w-full flex items-center gap-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
            formData.expectedCapacity === 0 && "border-[#123262] shadow-lg"
          )}
        >
          <div
            className={cn(
              "w-5 h-5 border rounded-full flex items-center justify-center",
              formData.expectedCapacity === 0 && "border-none"
            )}
          >
            <div
              className={cn(
                "opacity-0 w-4 h-4 rounded-full bg-[#123262] transition duration-150",
                formData.expectedCapacity === 0 && "opacity-100"
              )}
            />
          </div>
          <span className="text-[#123262] text-bold">
            ENTRE 100 E 200 PESSOAS
          </span>
        </label>
        <label
          onClick={() => {
            if (formData.expectedCapacity === 1) {
              setFormData({ ...formData, expectedCapacity: null });
            } else {
              setFormData({ ...formData, expectedCapacity: 1 });
            }
          }}
          className={cn(
            "w-full flex items-center gap-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
            formData.expectedCapacity === 1 && "border-[#123262] shadow-lg"
          )}
        >
          <div
            className={cn(
              "w-5 h-5 border rounded-full flex items-center justify-center",
              formData.expectedCapacity === 1 && "border-none"
            )}
          >
            <div
              className={cn(
                "opacity-0 w-4 h-4 rounded-full bg-[#123262] transition duration-150",
                formData.expectedCapacity === 1 && "opacity-100"
              )}
            />
          </div>
          <span className="text-[#123262] text-bold">ATÉ 400 PESSOAS</span>
        </label>
        <label
          onClick={() => {
            if (formData.expectedCapacity === 2) {
              setFormData({ ...formData, expectedCapacity: null });
            } else {
              setFormData({ ...formData, expectedCapacity: 2 });
            }
          }}
          className={cn(
            "w-full flex items-center gap-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
            formData.expectedCapacity === 2 && "border-[#123262] shadow-lg"
          )}
        >
          <div
            className={cn(
              "w-5 h-5 border rounded-full flex items-center justify-center",
              formData.expectedCapacity === 2 && "border-none"
            )}
          >
            <div
              className={cn(
                "opacity-0 w-4 h-4 rounded-full bg-[#123262] transition duration-150",
                formData.expectedCapacity === 2 && "opacity-100"
              )}
            />
          </div>
          <span className="text-[#123262] text-bold">
            ENTRE 500 E 900 PESSOAS
          </span>
        </label>
        <label
          onClick={() => {
            if (formData.expectedCapacity === 3) {
              setFormData({ ...formData, expectedCapacity: null });
            } else {
              setFormData({ ...formData, expectedCapacity: 3 });
            }
          }}
          className={cn(
            "w-full flex items-center gap-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
            formData.expectedCapacity === 3 && "border-[#123262] shadow-lg"
          )}
        >
          <div
            className={cn(
              "w-5 h-5 border rounded-full flex items-center justify-center",
              formData.expectedCapacity === 3 && "border-none"
            )}
          >
            <div
              className={cn(
                "opacity-0 w-4 h-4 rounded-full bg-[#123262] transition duration-150",
                formData.expectedCapacity === 3 && "opacity-100"
              )}
            />
          </div>
          <span className="text-[#123262] text-bold">
            ENTRE 1000 E 2000 PESSOAS
          </span>
        </label>
        <label
          onClick={() => {
            if (formData.expectedCapacity === 4) {
              setFormData({ ...formData, expectedCapacity: null });
            } else {
              setFormData({ ...formData, expectedCapacity: 4 });
            }
          }}
          className={cn(
            "w-full flex items-center gap-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
            formData.expectedCapacity === 4 && "border-[#123262] shadow-lg"
          )}
        >
          <div
            className={cn(
              "w-5 h-5 border rounded-full flex items-center justify-center",
              formData.expectedCapacity === 4 && "border-none"
            )}
          >
            <div
              className={cn(
                "opacity-0 w-4 h-4 rounded-full bg-[#123262] transition duration-150",
                formData.expectedCapacity === 4 && "opacity-100"
              )}
            />
          </div>
          <span className="text-[#123262] text-bold">
            ENTRE 3000 E 5000 PESSOAS
          </span>
        </label>
      </div>
    </>
  );
}
