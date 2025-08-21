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
  setHasUploaded: React.Dispatch<React.SetStateAction<boolean>>;
}
export function Step7({
  uploadContract,
  setUploadContract,
  setHasUploaded,
}: Props) {
  const { formData, setFormData } = useFormContext();
  const { PostAPI } = useApiContext();
  const [signOpen, setSignOpen] = useState(false);

  const searchParams = useSearchParams();
  const clientId = searchParams.get("clientId");
  const projectId = searchParams.get("projectId");

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
    projectId: projectId,
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

  const contratoProps = mapTreatedData(treatedData, {
    valorTotal: 15000,
    formasPagamento: "30 % na assinatura + 70 % na entrega",
    responsavel: "Edi Palheta",
  });

  async function uploadPdf(blob: Blob) {
    if (formData.contractUrl !== null && formData.contractUrl !== undefined)
      return;

    const docFormData = new FormData();
    docFormData.append("file", blob, "Contrato-Palheta.pdf");
    try {
      const response = await PostAPI("/file", docFormData, true);
      if (response.status === 200) {
        setFormData({ ...formData, contractUrl: response.body.fullUrl });
        console.log("Arquivo enviado com sucesso!");
        setUploadContract(false);
        setHasUploaded(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

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
    console.log("dataUrl", dataUrl);
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
        {(formData as any).signature && (
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
