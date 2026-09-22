"use client";

import { MaterialType } from "@/src/types/StudyType";
import { Minus, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type PdfViewerProps = {
  materialData: MaterialType;
  handleClose?: () => void;
};

export function PdfViewer({ materialData, handleClose }: PdfViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1.2);
  const [loading, setLoading] = useState<boolean>(true);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 2.5));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.6));

  useEffect(() => {
    let isMounted = true;

    async function renderPDF() {
      if (!containerRef.current || !materialData.url) return;
      setLoading(true);
      containerRef.current.innerHTML = "";

      try {
        // Carrega o PDF.js e os estilos da camada de texto dinamicamente
        // @ts-ignore
        if (!window.pdfjsLib) {
          // Injeta CSS da camada de texto para permitir seleção
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf_viewer.min.css";
          document.head.appendChild(link);

          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        // @ts-ignore
        const pdfjs = window.pdfjsLib;
        pdfjs.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

        const loadingTask = pdfjs.getDocument(materialData.url);
        const pdf = await loadingTask.promise;

        if (!isMounted) return;

        // Fator de Nitidez (Device Pixel Ratio para telas Retina/Full HD)
        const outputScale = window.devicePixelRatio || 1;

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale });

          // Container da Página
          const pageWrapper = document.createElement("div");
          pageWrapper.className = "relative shadow-lg rounded bg-white my-4 overflow-hidden border border-stone-200 select-text";
          pageWrapper.style.width = `${viewport.width}px`;
          pageWrapper.style.height = `${viewport.height}px`;

          // 1. CANVAS COM ALTA RESOLUÇÃO (HD)
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          canvas.width = Math.floor(viewport.width * outputScale);
          canvas.height = Math.floor(viewport.height * outputScale);
          canvas.style.width = `${viewport.width}px`;
          canvas.style.height = `${viewport.height}px`;

          pageWrapper.appendChild(canvas);

          // 2. CAMADA DE TEXTO SELECIONÁVEL (Text Layer)
          const textLayerDiv = document.createElement("div");
          textLayerDiv.className = "textLayer absolute inset-0 leading-none";
          pageWrapper.appendChild(textLayerDiv);

          containerRef.current?.appendChild(pageWrapper);

          if (context) {
            // Renderiza o gráfico em HD
            const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined;
            await page.render({
              canvasContext: context,
              viewport: viewport,
              transform: transform,
            }).promise;

            // Renderiza a camada de texto transparente sobre a imagem
            const textContent = await page.getTextContent();
            pdfjs.renderTextLayer({
              textContentSource: textContent,
              container: textLayerDiv,
              viewport: viewport,
              textDivs: [],
            });
          }
        }
      } catch (error) {
        console.error("Erro ao renderizar PDF HD:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    renderPDF();

    return () => {
      isMounted = false;
    };
  }, [materialData.url, scale]);

  return (
    <div className="relative flex flex-col w-full h-screen bg-stone-100 overflow-hidden">
      {/* BARRA SUPERIOR CUSTOMIZADA */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-stone-200 z-20 shadow-sm">
        <span className="text-sm font-semibold text-stone-700 truncate">
          {materialData.name}
        </span>

        {handleClose && (
          <button
            onClick={handleClose}
            className="p-1.5 text-stone-500 hover:bg-stone-100 rounded-full transition-colors"
          >
            <X className="size-5" />
          </button>
        )}
      </div>

      {/* ÁREA DE SCROLL */}
      <div className="flex-1 w-full overflow-y-auto p-6 flex flex-col items-center">
        {loading && (
          <div className="my-10 text-stone-500 text-sm font-medium animate-pulse">
            Carregando documento em alta definição...
          </div>
        )}
        <div ref={containerRef} className="flex flex-col items-center" />
      </div>

      {/* CONTROLE DE ZOOM */}
      <div className="fixed right-8 bottom-8 bg-white/95 backdrop-blur-md border border-stone-200 rounded-full p-1.5 shadow-xl flex items-center gap-2 z-30">
        <button
          onClick={zoomOut}
          className="p-2 hover:bg-stone-100 rounded-full text-stone-600 transition-colors"
        >
          <Minus className="size-4" />
        </button>

        <span className="text-xs font-semibold text-stone-600 w-12 text-center select-none">
          {Math.round(scale * 100)}%
        </span>

        <button
          onClick={zoomIn}
          className="p-2 hover:bg-stone-100 rounded-full text-stone-600 transition-colors"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}