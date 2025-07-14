import { saveAs } from "file-saver";
import { PDFDocument } from "pdf-lib";
import React, { useCallback, useEffect, useState } from "react";

function gerarCpf(): string {
  // gera 9 dígitos base
  const n = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));

  // calcula dígitos verificadores
  const calcDV = (digits: number[]) => {
    const s = digits
      .map((d, i) => d * (digits.length + 1 - i))
      .reduce((acc, v) => acc + v, 0);
    const r = (s * 10) % 11;
    return r === 10 ? 0 : r;
  };
  n.push(calcDV(n));
  n.push(calcDV(n));

  // formata ###.###.###-##
  return `${n.slice(0, 3).join("")}.${n.slice(3, 6).join("")}.${n
    .slice(6, 9)
    .join("")}-${n.slice(9).join("")}`;
}

const PdfFillerViewer: React.FC = () => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  const generateFilledPdf = useCallback(async () => {
    // 1. Baixa o template
    const pdfBytes = await fetch("/template.pdf").then((r) => r.arrayBuffer());
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();

    console.log(
      "campos",
      form.getFields().map((f) => f.getName()) // imprime todos os nomes
    );

    form.getTextField("name").setText("Maria");
    form.getTextField("cpf").setText(gerarCpf());

    form.flatten(); // trava a edição

    // 3. Gera blob e URL
    const filledBytes = await pdfDoc.save();
    const url = URL.createObjectURL(
      new Blob([filledBytes], { type: "application/pdf" })
    );

    setBlobUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
  }, []);

  useEffect(() => {
    generateFilledPdf();
    return () => {
      setBlobUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
    };
  }, [generateFilledPdf]);

  if (!blobUrl) return <p>Gerando PDF…</p>;

  return (
    <div className="flex flex-col gap-4">
      <iframe
        src={blobUrl}
        title="PDF gerado"
        className="w-full h-[80vh] border rounded-xl shadow"
      />
      <button
        onClick={() => saveAs(blobUrl, "relatorio.pdf")}
        className="self-end px-4 py-2 rounded-xl shadow ring-1 ring-gray-300 hover:bg-gray-50"
      >
        Baixar PDF
      </button>
    </div>
  );
};

export default PdfFillerViewer;
