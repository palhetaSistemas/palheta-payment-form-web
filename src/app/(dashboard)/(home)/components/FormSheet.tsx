"use client";
import { Sheet, SheetContent } from "@/src/components/ui/sheet";
import { useApiContext } from "@/src/context/ApiContext";
import { useFormContext } from "@/src/context/Contex";
import { cn } from "@/src/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
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
import { Step8 } from "./Step8";

interface FormSheetProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCompleted: boolean;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface FormDataProps {
  clientId: string;
  totalTax: number;
  userId: string;
  duration: number;
  monthlyFee: number;
  discountedOffer: number;
  paidOffer: number;
  upfrontRate: number;
  reserverFundRate: number;
  creditValue: number;
}
export function FormSheet({
  open,
  setOpen,
  isCompleted,
  setIsCompleted,
}: FormSheetProps) {
  const { formData } = useFormContext();
  const { PostAPI, GetAPI } = useApiContext();
  const params = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [allowNextStep, setAllowNextStep] = useState(false);
  const [isIphone, setIsIphone] = useState(false);
  const [uploadContract, setUploadContract] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [values, setValues] = useState({
    complementarValue: 0,
    architectureValue: 0,
    socialMediaValue: 0,
  });

  const proposalId = params.get("proposalId");

  const floors: Record<number, string> = {
    1: "TERREO",
    2: "TERREO + 1",
    3: "TERREO + 2",
    4: "TERREO + 3",
    5: "TERREO + 4",
    6: "TERREO + 5",
    7: "TERREO + 6",
  };
  const capacity: Record<number, string> = {
    0: "ENTRE 100 E 200 PESSOAS",
    1: "ATÉ 400 PESSOAS",
    2: "ENTRE 500 E 900 PESSOAS",
    3: "ENTRE 1000 E 2000 PESSOAS",
    4: "ENTRE 3000 E 5000 PESSOAS",
  };

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
        return setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 6) {
      setUploadContract(false);
      setHasUploaded(false);
      return setCurrentStep(currentStep + 1);
    } else if (currentStep === 7) {
      return setUploadContract(true);
    } else if (currentStep === 8) {
      setOpen(false);
      return setIsCompleted(true);
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
    } else if (currentStep === 7) {
      setAllowNextStep(true);
    } else if (currentStep === 7) {
      setAllowNextStep(true);
    }
  }, [formData, currentStep]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isIphonee = navigator.userAgent.includes("iPhone");
      if (isIphonee) setIsIphone(true);
    }
  }, []);

  async function handleGetProposalDetails() {
    const result = await GetAPI(`/proposal/details/${proposalId}`, false);

    if (result.status === 200) {
      setValues({
        complementarValue: result.body.proposal.complementarProjectsValue,
        architectureValue: result.body.proposal.architectureValue,
        socialMediaValue: result.body.proposal.socialMediaContentValue,
      });
    }
  }

  useEffect(() => {
    handleGetProposalDetails();
  }, [proposalId]);

  const [finalValue, setFinalValue] = useState(0);

  useEffect(() => {
    if (
      values.complementarValue &&
      values.architectureValue &&
      values.socialMediaValue
    ) {
      const architectureProject =
        formData.services?.includes("PROJETO ARQUITETÔNICO") || false;

      const socialMediaContent =
        formData.services?.includes("3D E MÍDIAS PARA REDES SOCIAIS") || false;

      const complementarProjects =
        formData.services?.includes("PROJETOS COMPLEMENTARES") || false;

      const finalValue =
        (architectureProject ? values.architectureValue : 0) +
        (socialMediaContent ? values.socialMediaValue : 0) +
        (complementarProjects ? values.complementarValue : 0);

      setFinalValue(finalValue);
    }
  }, [values]);

  async function handlePostForm() {
    console.log("chegou aqui0 ");
    setIsSending(true);
    console.log("chegou aqui ");
    try {
      const treatedData = {
        proposalId: proposalId,
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
        contractUrl: formData.contractUrl,
        installmentCount: formData.installmentCount?.toString(),
        hasSigned: formData.signatureUrl ? true : false,
        finalValue: finalValue.toString(),
      };
      console.log("chegou aqui 2");
      console.log("treatedData", treatedData);
      const response = await PostAPI("/contract", treatedData, true);

      if (response.status === 200) {
        toast.success("Formulário enviado com sucesso!");
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      toast.error(`Ops! algo deu errado, tente novamente,: ${error}`);
      console.log("erro", error);
    } finally {
      setIsSending(false);
    }
  }
  useEffect(() => {
    console.log("ch1");
    if (hasUploaded) {
      console.log("ch2");
      handlePostForm();
    }
  }, [hasUploaded]);
  console.log("hasUploaded23", hasUploaded);
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
        onKeyDown={(e) => e.key === "Enter" && HandleNextStep()}
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
          <Step7
            uploadContract={uploadContract}
            setHasUploaded={setHasUploaded}
            hasUploaded={hasUploaded}
            setUploadContract={setUploadContract}
            finalValues={finalValue}
          />
        ) : (
          <Step8 />
        )}
        <button
          onClick={HandleNextStep}
          disabled={isSending}
          onKeyDown={(e) => e.key === "Enter" && HandleNextStep()}
          className={cn(
            "w-full h-12 bg-gradient-to-b flex items-center justify-center from-[#123262dd] to-[#123262] shadow-md border border-[#123262] text-white font-bold text-lg rounded-xl transition duration-300",
            !allowNextStep && "opacity-50 cursor-not-allowed"
          )}
        >
          {isCompleted ? "FINALIZAR" : "PRÓXIMO"}
        </button>
      </SheetContent>
    </Sheet>
  );
}
