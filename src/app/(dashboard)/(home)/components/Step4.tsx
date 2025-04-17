"use client";
import { useFormContext } from "@/src/context/Contex";
import { cn } from "@/src/lib/utils";

export function Step4() {
  const { formData, setFormData } = useFormContext();

  return (
    <>
      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-lg text-[#123262]">
            ÁREA DA CONSTRUÇÃO
          </span>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-default-600 w-max font-semibold text-sm">
                ÁREA EM M²
              </label>
              <input
                className="w-full rounded-xl border-2 border-[#123262] h-12 px-4 focus:outline-none placeholder:text-default-400"
                placeholder="INSIRA SEU EMAIL"
                onChange={(e) =>
                  setFormData({ ...formData, area: Number(e.target.value) })
                }
                value={Number(formData.area)}
                type="number"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold text-lg text-[#123262]">
            QUANTIDADE DE PAVIMENTOS
          </span>

          <div className="flex flex-col gap-4">
            <label className="text-default-600 w-max font-semibold text-sm">
              Selecione abaixo*:
            </label>
            <label
              onClick={() => {
                if (formData.numberOfFloors === 1) {
                  setFormData({ ...formData, numberOfFloors: null });
                } else {
                  setFormData({ ...formData, numberOfFloors: 1 });
                }
              }}
              className={cn(
                "w-full flex items-center gap-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
                formData.numberOfFloors === 1 && "border-[#123262] shadow-lg"
              )}
            >
              <div
                className={cn(
                  "w-5 h-5 border rounded-full flex items-center justify-center",
                  formData.numberOfFloors === 1 && "border-none"
                )}
              >
                <div
                  className={cn(
                    "opacity-0 w-4 h-4 rounded-full bg-[#123262] transition duration-150",
                    formData.numberOfFloors === 1 && "opacity-100"
                  )}
                />
              </div>
              <span className="text-[#123262] text-bold">TÉRREO</span>
            </label>
            <label
              onClick={() => {
                if (formData.numberOfFloors === 2) {
                  setFormData({ ...formData, numberOfFloors: null });
                } else {
                  setFormData({ ...formData, numberOfFloors: 2 });
                }
              }}
              className={cn(
                "w-full flex items-center gap-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
                formData.numberOfFloors === 2 && "border-[#123262] shadow-lg"
              )}
            >
              <div
                className={cn(
                  "w-5 h-5 border rounded-full flex items-center justify-center",
                  formData.numberOfFloors === 2 && "border-none"
                )}
              >
                <div
                  className={cn(
                    "opacity-0 w-4 h-4 rounded-full bg-[#123262] transition duration-150",
                    formData.numberOfFloors === 2 && "opacity-100"
                  )}
                />
              </div>
              <span className="text-[#123262] text-bold">TÉRREO +1</span>
            </label>
            <label
              onClick={() => {
                if (formData.numberOfFloors === 3) {
                  setFormData({ ...formData, numberOfFloors: null });
                } else {
                  setFormData({ ...formData, numberOfFloors: 3 });
                }
              }}
              className={cn(
                "w-full flex items-center gap-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
                formData.numberOfFloors === 3 && "border-[#123262] shadow-lg"
              )}
            >
              <div
                className={cn(
                  "w-5 h-5 border rounded-full flex items-center justify-center",
                  formData.numberOfFloors === 3 && "border-none"
                )}
              >
                <div
                  className={cn(
                    "opacity-0 w-4 h-4 rounded-full bg-[#123262] transition duration-150",
                    formData.numberOfFloors === 3 && "opacity-100"
                  )}
                />
              </div>
              <span className="text-[#123262] text-bold">TÉRREO +2</span>
            </label>
            <label
              onClick={() => {
                if (formData.numberOfFloors === 4) {
                  setFormData({ ...formData, numberOfFloors: null });
                } else {
                  setFormData({ ...formData, numberOfFloors: 4 });
                }
              }}
              className={cn(
                "w-full flex items-center gap-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
                formData.numberOfFloors === 4 && "border-[#123262] shadow-lg"
              )}
            >
              <div
                className={cn(
                  "w-5 h-5 border rounded-full flex items-center justify-center",
                  formData.numberOfFloors === 4 && "border-none"
                )}
              >
                <div
                  className={cn(
                    "opacity-0 w-4 h-4 rounded-full bg-[#123262] transition duration-150",
                    formData.numberOfFloors === 4 && "opacity-100"
                  )}
                />
              </div>
              <span className="text-[#123262] text-bold">TÉRREO +3</span>
            </label>
            <label
              onClick={() => {
                if (formData.numberOfFloors === 5) {
                  setFormData({ ...formData, numberOfFloors: null });
                } else {
                  setFormData({ ...formData, numberOfFloors: 5 });
                }
              }}
              className={cn(
                "w-full flex items-center gap-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
                formData.numberOfFloors === 5 && "border-[#123262] shadow-lg"
              )}
            >
              <div
                className={cn(
                  "w-5 h-5 border rounded-full flex items-center justify-center",
                  formData.numberOfFloors === 5 && "border-none"
                )}
              >
                <div
                  className={cn(
                    "opacity-0 w-4 h-4 rounded-full bg-[#123262] transition duration-150",
                    formData.numberOfFloors === 5 && "opacity-100"
                  )}
                />
              </div>
              <span className="text-[#123262] text-bold">TÉRREO + 4</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
