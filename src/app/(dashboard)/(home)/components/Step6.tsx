"use client";

import { useApiContext } from "@/src/context/ApiContext";
import { useFormContext } from "@/src/context/Contex";
import { pdf, PDFViewer } from "@react-pdf/renderer";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { mapTreatedData, PalhetaContract } from "./Pdf";

export function Step6() {
  const { formData, setFormData } = useFormContext();
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
  const searchParams = useSearchParams();

  const clientId = searchParams.get("clientId");
  const projectId = searchParams.get("projectId");

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
      "https://www.planura.mg.leg.br/imagens/teste.jpg/image_preview",
    // formData.contractUrl ?? "",
  };

  const contratoProps = mapTreatedData(treatedData, {
    // preencha apenas se já tiver essas infos
    valorTotal: 15000,
    formasPagamento: "30 % na assinatura + 70 % na entrega",
    responsavel: "Edi Palheta",
  });
  async function uploadPdf(blob: Blob) {
    console.log("formDataCTT", formData.contractUrl);
    if (formData.contractUrl !== null) return;

    const docFormData = new FormData();
    docFormData.append("file", blob, "Contrato-Palheta.pdf");
    try {
      const response = await PostAPI("/file", docFormData, true);
      console.log("response", response);
      if (response.status === 200) {
        console.log("response", response.body.url);
        setFormData({ ...formData, contractUrl: response.body.fullUrl });
        console.log("Arquivo enviado com sucesso!");
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  async function handleSend() {
    // 1. Monte as props (use mapTreatedData ou qualquer fonte)
    const contratoProps = mapTreatedData(treatedData);

    // 2. Gere o Blob
    const blob = await pdf(<PalhetaContract {...contratoProps} />).toBlob();

    // 3. Envie para a API
    await uploadPdf(blob);
  }
  useEffect(() => {
    if (formData.contractUrl) return;
    handleSend();
  }, []);
  return (
    <>
      <span className="font-bold text-lg text-[#123262] mx-auto w-max">
        CONTRATO
      </span>
      <div className="w-full h-[400px] lg:h-[600px] bg-default-300 rounded-lg">
        {/* <PDFDownloadLink
          document={<PalhetaContract {...contratoProps} />}
          fileName="recipe.pdf"
          className="border-primary border  font-semibold flex items-center justify-center w-full h-full  gap-2 px-2 py-1 rounded-md"
        ></PDFDownloadLink> */}
        <PDFViewer width="100%" height="100%">
          <PalhetaContract {...contratoProps} />
        </PDFViewer>
      </div>
    </>
  );
}
