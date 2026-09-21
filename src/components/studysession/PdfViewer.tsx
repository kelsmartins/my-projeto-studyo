"use client";

import { MaterialType } from "@/src/types/StudyType";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Document, Page } from "react-pdf"
import { pdfjs } from 'react-pdf';
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

export type PdfViewerProps = {
    materialData: MaterialType;
    handleClose?: () => void;
};

export function PdfViewer({ materialData, handleClose }: PdfViewerProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [scale, setScale] = useState(1.0);

    // Funções para aumentar e diminuir zoom
    const zoomIn = () => setScale(prevScale => Math.min(prevScale + 0.2, 3)); // máximo 300%
    const zoomOut = () => setScale(prevScale => Math.max(prevScale - 0.2, 0.5)); // mínimo 50%

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    return (
        <Document
            className="mt-50"
            file={materialData.url}
            onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} scale={scale}/>

            <PageActions pageNumber={pageNumber} setPageNumber={setPageNumber} numPages={numPages} />

            <DocumentScale scale={scale} zoomIn={zoomIn} zoomOut={zoomOut}/>

        </Document>
    )
}








type PageActionsProps = {
    pageNumber: number;
    setPageNumber: (num: number) => void;
    numPages?: number;
}

export function PageActions({ pageNumber, setPageNumber, numPages }: PageActionsProps) {
    const safeNumPages = numPages ?? 1;
    return (
        <div
            className="w-60 h-12 absolute bottom-4 left-[29%] text-white text-sm bg-white rounded-full border border-[#292524]/20 shadow-lg flex items-center justify-between gap-2 p-4"
            onClick={(e) => e.stopPropagation()}>

            <button
                className="flex items-center justify-between  text-[#292524]/70"
                onClick={() => {
                    if (pageNumber > 1) {
                        setPageNumber(pageNumber - 1)
                    }
                }}>
                <ChevronLeft className="size-5"
                />
                <span className="text-sm">Anterior</span>
            </button>

            <button
                className="flex items-center justify-between text-[#292524]/60 "
                onClick={() => {
                    if (pageNumber < (numPages || 1)) {
                        setPageNumber(pageNumber + 1)
                    }
                }}>
                <span className="text-sm">Próxima</span>
                <ChevronRight className="size-5"
                />
            </button>
        </div>
    )
}

type DocumentScaleProps = {
    zoomOut: () => void;
    zoomIn: () => void;
    scale: number;
}

export function DocumentScale({ zoomOut, zoomIn, scale }: DocumentScaleProps) {
    return (
        <div className="fixed right-110 bottom-6 bg-white p-2 flex rounded-full text-gray-600">
            
            <button onClick={zoomOut} className="p-1 flex items-center justify-center"><Minus className="size-3"/></button>
            <span className="text-xs flex items-center justify-center">{(scale * 100).toFixed(0)}%</span>
            <button onClick={zoomIn} className="p-1 flex items-center justify-center"><Plus className="size-3"/></button>
            
        </div>
    )
}