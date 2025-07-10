"use client";
import { Sheet, SheetContent } from "@/src/components/ui/sheet";
import { useApiContext } from "@/src/context/ApiContext";
import { useFormContext } from "@/src/context/Contex";
import { cn } from "@/src/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Step0 } from "./Step0";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { Step5 } from "./Step5";
import { Step6 } from "./Step6";
import { Step7 } from "./Step7";

interface FormSheetProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function FormSheet({ open, setOpen }: FormSheetProps) {
  const { formData } = useFormContext();
  const [currentStep, setCurrentStep] = useState(0);
  const [allowNextStep, setAllowNextStep] = useState(false);
  const [isIphone, setIsIphone] = useState(false);
  console.log("formData", formData);
  const HandleNextStep = () => {
    if (currentStep === 0) {
      if (formData.name === "" || !formData.email.includes("@")) {
        return toast.error("Insira seu nome e email");
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
      if (formData.services?.length === 0) {
        return toast.error("Escolha um ou mais serviços");
      } else {
        return setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 4) {
      if (formData.area === null || formData.numberOfFloors === null) {
        return toast.error("Preencha corretamente os campos abaixo");
      } else {
        return setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 5) {
      if (formData.expectedCapacity === null) {
        return toast.error("Selecione a capacidade esperada");
      } else {
        handlePostForm();
        return setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 6) {
      return setCurrentStep(currentStep + 1);
    }
  };

  useEffect(() => {
    if (currentStep === 0) {
      if (formData.name === "" || formData.email === "") {
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
      if (formData.services?.length === 0) {
        return setAllowNextStep(false);
      } else {
        return setAllowNextStep(true);
      }
    } else if (currentStep === 4) {
      if (formData.area === null || formData.numberOfFloors === null) {
        return setAllowNextStep(false);
      } else {
        return setAllowNextStep(true);
      }
    } else if (currentStep === 5) {
      if (formData.expectedCapacity === null) {
        return setAllowNextStep(false);
      } else {
        return setAllowNextStep(true);
      }
    } else if (currentStep === 6) {
      setAllowNextStep(true);
    }
  }, [formData, currentStep]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isIphonee = navigator.userAgent.includes("iPhone");
      if (isIphonee) setIsIphone(true);
    }
  }, []);
  const { PostAPI } = useApiContext();
  const floors: Record<number, string> = {
    1: "TERREO",
    2: "TERREO + 1",
    3: "TERREO + 2",
    4: "TERREO + 3",
    5: "TERREO + 4",
    6: "TERREO + 5",
    7: "TERREO + 6",
    // se tiver mais, basta ir adicionando
  };
  const capacity: Record<number, string> = {
    0: "ENTRE 100 E 200 PESSOAS",
    1: "ATÉ 400 PESSOAS",
    2: "ENTRE 500 E 900 PESSOAS",
    3: "ENTRE 1000 E 2000 PESSOAS",
    4: "ENTRE 3000 E 5000 PESSOAS",
    // se tiver mais, basta ir adicionando
  };
  async function handlePostForm() {
    try {
      console.log("formData", formData);

      const treatedData = {
        clientId: "4e73a9b9-1ea5-4b49-a742-260e1968a0fa",
        projectId: "d8aa5c14-e7c6-4112-8a43-962cb231f978",
        name: formData.name,
        email: formData.email,
        cpfCnpj: formData.cpfCnpj,
        postalCode: formData.zipCode,
        address: formData.street,
        number: formData.number,
        neighborhood: formData.neighborhood,
        city: formData.city,
        state: formData.state,
        architectureProject:
          formData.services?.includes("PROJETO ARQUITETÔNICO") || false,
        socialMediaContent:
          formData.services?.includes("3D E MÍDIAS PARA REDES SOCIAIS") ||
          false,
        complementarProjects:
          formData.services?.includes("PROJETOS COMPLEMENTARES") || false,
        area: `${formData.area}m²`,
        flooring:
          formData.numberOfFloors !== null
            ? floors[formData.numberOfFloors]
            : "",
        capacity:
          formData.expectedCapacity !== null
            ? capacity[formData.expectedCapacity]
            : "",
        contractUrl:
          "https://www.planura.mg.leg.br/imagens/teste.jpg/image_preview",
        // formData.contractUrl ?? "",
      };
      console.log("treatedData", treatedData);
      const response = await PostAPI("/contract", treatedData, true);
      console.log("response", response);
      if (response.status === 200) {
        toast.success("Formulário enviado com sucesso!");
      }
    } catch (error) {
      toast.error(`Ops! algo deu errado, tente novamente,: ${error}`);
      console.log("erro", error);
    }
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="bottom"
        className={cn(
          "min-h-1/2 flex flex-col w-full lg:w-[500px] lg:mx-auto justify-between ",
          currentStep === 4 && "h-[80vh] max-h-max min-h-80",
          isIphone && " ",
          isIphone && currentStep === 4 && "  h-[80vh]"
        )}
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
        ) : currentStep === 4 ? (
          <Step4 />
        ) : currentStep === 5 ? (
          <Step5 />
        ) : currentStep === 6 ? (
          <Step6 />
        ) : currentStep === 7 ? (
          <Step7 />
        ) : (
          <></>
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
