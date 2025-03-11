"use client";
import { Sheet, SheetContent } from "@/src/components/ui/sheet";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useFormContext } from "@/src/context/Contex";
import toast from "react-hot-toast";
import { cn } from "@/src/lib/utils";
import { Step0 } from "./Step0";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";

interface FormSheetProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function FormSheet({ open, setOpen }: FormSheetProps) {
  const { formData } = useFormContext();
  const [currentStep, setCurrentStep] = useState(0);
  const [allowNextStep, setAllowNextStep] = useState(false);

  const HandleNextStep = () => {
    if (currentStep === 0) {
      if (formData.name === "") {
        return toast.error("Insira seu nome ou razão social");
      } else {
        return setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 1) {
      if (formData.cpfCnpj === "") {
        return toast.error("Insira seu CPF ou CNPJ");
      } else {
        return setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 2) {
      if (formData.zipCode === "" || formData.number === "") {
        return toast.error("Insira seu CEP e número");
      } else {
        return setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 3) {
      if (formData.email === "" || formData.service === null) {
        return toast.error("Insira seu email e escolha um serviço");
      } else {
        return setCurrentStep(currentStep + 1);
      }
    }
  };

  useEffect(() => {
    if (currentStep === 0) {
      if (formData.name === "") {
        return setAllowNextStep(false);
      } else {
        return setAllowNextStep(true);
      }
    } else if (currentStep === 1) {
      if (formData.cpfCnpj === "") {
        return setAllowNextStep(false);
      } else {
        return setAllowNextStep(true);
      }
    } else if (currentStep === 2) {
      if (formData.zipCode === "" || formData.number === "") {
        return setAllowNextStep(false);
      } else {
        return setAllowNextStep(true);
      }
    } else if (currentStep === 3) {
      if (formData.email === "" || formData.service === null) {
        return setAllowNextStep(false);
      } else {
        return setAllowNextStep(true);
      }
    }
  }, [formData, currentStep]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="bottom"
        className="min-h-1/2 pt-8 flex flex-col w-full lg:w-[500px] lg:mx-auto justify-between max-h-[calc(100%-15rem)]"
      >
        {currentStep > 0 && (
          <ArrowLeft
            className="text-[#123262] absolute top-2 left-2 w-6 h-6"
            onClick={() => {
              setCurrentStep(currentStep - 1);
            }}
          />
        )}
        {currentStep === 0 ? (
          <Step0 />
        ) : currentStep === 1 ? (
          <Step1 />
        ) : currentStep === 2 ? (
          <Step2 />
        ) : currentStep === 3 ? (
          <Step3 />
        ) : (
          <Step4 />
        )}
        <button
          onClick={HandleNextStep}
          className={cn(
            "w-full h-12 bg-gradient-to-b from-[#123262dd] to-[#123262] shadow-md border border-[#123262] text-white font-bold text-lg rounded-xl transition duration-300",
            !allowNextStep && "opacity-50 cursor-not-allowed"
          )}
        >
          PRÓXIMO
        </button>
      </SheetContent>
    </Sheet>
  );
}
