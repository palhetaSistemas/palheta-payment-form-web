import { useEffect, useRef } from "react";

export function SignatureModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (dataUrl: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const drawingRef = useRef(false);

  // Ajusta o canvas para alta densidade de pixels
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ratio = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();

    // Tamanho visual
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${Math.max(240, rect.width * 0.5)}px`;

    // Buffer real (para não ficar borrado em telas retina)
    const width = rect.width * ratio;
    const height = Math.max(240, rect.width * 0.5) * ratio;
    canvas.width = Math.floor(width);
    canvas.height = Math.floor(height);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0); // mapeia coordenadas 1:1 ao CSS
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#111827"; // neutral-900

    // Plano de fundo branco (útil se você for exportar PNG/JPEG para colocar no PDF)
    ctx.save();
    ctx.fillStyle = "transparent";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    contextRef.current = ctx;
  };

  // Coordenadas relativas ao canvas
  const getPos = (evt: PointerEvent | React.PointerEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!contextRef.current) return;
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
    drawingRef.current = true;
    const { x, y } = getPos(e);
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!contextRef.current || !drawingRef.current) return;
    const { x, y } = getPos(e);
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  const stopDrawing = (
    e?:
      | React.PointerEvent<HTMLCanvasElement>
      | React.MouseEvent
      | React.TouchEvent
  ) => {
    if (!contextRef.current) return;
    drawingRef.current = false;
    contextRef.current.closePath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;
    // limpa e repinta o fundo branco
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  };

  const confirmSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    onConfirm(dataUrl);
  };

  useEffect(() => {
    if (!open) return;
    resizeCanvas();
    const onResize = () => resizeCanvas();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-2xl rounded-2xl lg:w-[500px] bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold text-[#123262]">
            Assinar Contrato
          </h2>
          <button
            onClick={onClose}
            className="rounded-xl px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Fechar
          </button>
        </div>

        <div className="p-4">
          <p className="mb-3 text-sm text-gray-600">
            Assine o contrato. Se precisar, clique em{" "}
            <span className="font-medium">Refazer</span> para limpar.
          </p>
          <div className="rounded-xl border  ">
            <div className="relative w-full">
              <canvas
                ref={canvasRef}
                className=" w-full touch-none rounded-lg "
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={stopDrawing}
                onPointerLeave={stopDrawing}
              />
            </div>
            <div className="pointer-events-none absolute inset-x-4 bottom-3 flex items-center justify-between text-xs text-gray-400">
              <span>Assinatura</span>
              <span>—</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 border-t p-4">
          <button
            onClick={clearCanvas}
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Refazer
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              onClick={confirmSignature}
              className="rounded-xl bg-[#123262] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
