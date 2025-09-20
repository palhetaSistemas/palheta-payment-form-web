"use client";

import { useApiContext } from "@/src/context/ApiContext";
import { useFormContext } from "@/src/context/Contex";
import { pdf, PDFViewer } from "@react-pdf/renderer";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { mapTreatedData, PalhetaContract } from "./Pdf";
import { SignatureModal } from "./SignatureModal";

// -----------------------------
// Modal de assinatura (mouse/touch)
// -----------------------------

// -----------------------------
// STEP 6
// -----------------------------
interface Props {
  uploadContract: boolean;
  setUploadContract: React.Dispatch<React.SetStateAction<boolean>>;
  hasUploaded: boolean;
  setHasUploaded: React.Dispatch<React.SetStateAction<boolean>>;
  finalValues: any;
}
export function Step7({
  uploadContract,
  setUploadContract,
  hasUploaded,
  setHasUploaded,
  finalValues,
}: Props) {
  const { formData, setFormData } = useFormContext();
  const { PostAPI } = useApiContext();
  const [signOpen, setSignOpen] = useState(false);
  const searchParams = useSearchParams();
  const clientId = searchParams.get("clientId");
  const proposalId = searchParams.get("proposalId");

  const floors: Record<number, string> = useMemo(
    () => ({
      1: "TERREO",
      2: "TERREO + 1",
      3: "TERREO + 2",
      4: "TERREO + 3",
      5: "TERREO + 4",
      6: "TERREO + 5",
      7: "TERREO + 6",
    }),
    []
  );

  const capacity: Record<number, string> = useMemo(
    () => ({
      0: "ENTRE 100 E 200 PESSOAS",
      1: "ATÉ 400 PESSOAS",
      2: "ENTRE 500 E 900 PESSOAS",
      3: "ENTRE 1000 E 2000 PESSOAS",
      4: "ENTRE 3000 E 5000 PESSOAS",
    }),
    []
  );

  const treatedData = {
    clientId: clientId,
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
      formData.services?.includes("3D E MÍDIAS PARA REDES SOCIAIS") || false,
    complementarProjects:
      formData.services?.includes("PROJETOS COMPLEMENTARES") || false,
    area: `${formData.area}m²`,
    flooring:
      formData.numberOfFloors !== null ? floors[formData.numberOfFloors] : "",
    capacity:
      formData.expectedCapacity !== null
        ? capacity[formData.expectedCapacity]
        : "",
    contractUrl:
      formData.contractUrl ??
      "https://www.planura.mg.leg.br/imagens/teste.jpg/image_preview",
    // NOVO: assinatura como dataURL (base64) vinda do modal
    signatureUrl: (formData as any).signatureUrl || null,
  } as any;
  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  const installmentCount = formData?.installmentCount ?? 1; // fallback para 1 se null/undefined
  const payment = finalValues / installmentCount;
  const contratoProps = mapTreatedData(treatedData, {
    valorTotal: finalValues,
    formasPagamento: `${installmentCount}x de R$ ${currencyFormatter.format(
      payment
    )}`,
    responsavel: "Edi Palheta",
  });

  async function uploadPdf(blob: Blob) {
    console.log("chego1");
    console.log("formData.contractUrl123131", formData.contractUrl);
    console.log("chego2");
    const docFormData = new FormData();
    docFormData.append("file", blob, "Contrato-Palheta.pdf");
    try {
      const response = await PostAPI("/file", docFormData, true);
      console.log("response file", response);
      if (response.status === 200) {
        setFormData({ ...formData, contractUrl: response.body.fullUrl });
        console.log("Arquivo enviado com sucesso!");
        setHasUploaded(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  console.log("hasUploaded", hasUploaded);
  async function handleSend() {
    // monta as props (já contendo signatureUrl quando houver)
    const contratoPropsLocal = mapTreatedData(treatedData);
    const blob = await pdf(
      <PalhetaContract {...contratoPropsLocal} />
    ).toBlob();

    await uploadPdf(blob);
  }

  useEffect(() => {
    if (uploadContract) {
      handleSend();
    }
  }, [uploadContract]);

  // Confirmação do modal
  const onConfirmSignature = (dataUrl: string) => {
    setFormData({ ...formData, signatureUrl: dataUrl } as any);
    setSignOpen(false);
  };

  return (
    <>
      <span className="mx-auto w-max text-lg font-bold text-[#123262]">
        CONTRATO
      </span>

      {/* Ações */}

      {/* Visualização do PDF */}
      <div className="mt-3 h-[400px] w-full rounded-lg bg-default-300 lg:h-[600px]">
        <PDFViewer width="100%" height="100%">
          <PalhetaContract {...contratoProps} />
        </PDFViewer>
      </div>
      <div className="mt-3 flex items-center w-full justify-end gap-3">
        <button
          onClick={() => setSignOpen(true)}
          className="rounded-xl bg-[#123262] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          Assinar contrato
        </button>
        {(formData as any).signatureUrl && (
          <span className="text-xs text-green-700">
            Assinatura adicionada ✓
          </span>
        )}
      </div>
      <SignatureModal
        open={signOpen}
        onClose={() => setSignOpen(false)}
        onConfirm={onConfirmSignature}
      />
    </>
  );
}
