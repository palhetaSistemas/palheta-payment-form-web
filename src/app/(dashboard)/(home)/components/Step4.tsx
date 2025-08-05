"use client";
import { useFormContext } from "@/src/context/Contex";
import { cn } from "@/src/lib/utils";

export function Step4() {
  const { formData, setFormData } = useFormContext();

  return (
    <div className="max-h-[60%] pb-20">
      <span className="font-bold text-lg text-[#123262] w-full text-center mx-auto">
        SELECIONE A ÁREA E A QUANTIDADE DE PISOS
      </span>
      <div className="flex flex-col gap-4 h-full">
        <div className="flex-1 gap-4 flex flex-col overflow-y-scroll">
          <div className="flex flex-col">
            <label className="text-default-600 w-max font-semibold text-sm">
              Área
            </label>
            <input
              className="w-full rounded-xl text-[16px] border-2 border-[#123262] h-12 px-4 focus:outline-none placeholder:text-default-400"
              placeholder="Área"
              onChange={(e) =>
                setFormData({ ...formData, area: Number(e.target.value) })
              }
              value={Number(formData.area).toString()}
              type="number"
              autoFocus
            />
          </div>
          <div className="flex flex-col">
            <label className="text-default-600 w-max font-semibold text-sm">
              Quantidade de Pavimentos
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
                "w-full flex items-center gap-2 my-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
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
                "w-full flex items-center gap-2 my-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
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
                "w-full flex items-center gap-2 my-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
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
                "w-full flex items-center gap-2 my-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
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
                "w-full flex items-center gap-2 my-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
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
            <label
              onClick={() => {
                if (formData.numberOfFloors === 6) {
                  setFormData({ ...formData, numberOfFloors: null });
                } else {
                  setFormData({ ...formData, numberOfFloors: 6 });
                }
              }}
              className={cn(
                "w-full flex items-center gap-2 my-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
                formData.numberOfFloors === 6 && "border-[#123262] shadow-lg"
              )}
            >
              <div
                className={cn(
                  "w-5 h-5 border rounded-full flex items-center justify-center",
                  formData.numberOfFloors === 6 && "border-none"
                )}
              >
                <div
                  className={cn(
                    "opacity-0 w-4 h-4 rounded-full bg-[#123262] transition duration-150",
                    formData.numberOfFloors === 6 && "opacity-100"
                  )}
                />
              </div>
              <span className="text-[#123262] text-bold">TÉRREO + 5</span>
            </label>
            <label
              onClick={() => {
                if (formData.numberOfFloors === 7) {
                  setFormData({ ...formData, numberOfFloors: null });
                } else {
                  setFormData({ ...formData, numberOfFloors: 7 });
                }
              }}
              className={cn(
                "w-full flex items-center gap-2 my-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
                formData.numberOfFloors === 7 && "border-[#123262] shadow-lg"
              )}
            >
              <div
                className={cn(
                  "w-5 h-5 border rounded-full flex items-center justify-center",
                  formData.numberOfFloors === 7 && "border-none"
                )}
              >
                <div
                  className={cn(
                    "opacity-0 w-4 h-4 rounded-full bg-[#123262] transition duration-150",
                    formData.numberOfFloors === 7 && "opacity-100"
                  )}
                />
              </div>
              <span className="text-[#123262] text-bold">TÉRREO + 6</span>
            </label>
            <label
              onClick={() => {
                if (formData.numberOfFloors === 8) {
                  setFormData({ ...formData, numberOfFloors: null });
                } else {
                  setFormData({ ...formData, numberOfFloors: 8 });
                }
              }}
              className={cn(
                "w-full flex items-center gap-2 my-2 rounded-xl border-2 h-12 px-4 relative transition duration-150",
                formData.numberOfFloors === 8 && "border-[#123262] shadow-lg"
              )}
            >
              <div
                className={cn(
                  "w-5 h-5 border rounded-full flex items-center justify-center",
                  formData.numberOfFloors === 8 && "border-none"
                )}
              >
                <div
                  className={cn(
                    "opacity-0 w-4 h-4 rounded-full bg-[#123262] transition duration-150",
                    formData.numberOfFloors === 8 && "opacity-100"
                  )}
                />
              </div>
              <span className="text-[#123262] text-bold">TÉRREO + 7</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
