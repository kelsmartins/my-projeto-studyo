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
            className="mt-"
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

// "use client";

// import { MaterialType } from "@/src/types/StudyType";
// import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import { Document, Page } from "react-pdf";
// import { pdfjs } from "react-pdf";
// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url,
// ).toString();

// export type PdfViewerProps = {
//   materialData: MaterialType;
//   handleClose?: () => void;
// };

// export function PdfViewer({ materialData, handleClose }: PdfViewerProps) {
//   const [numPages, setNumPages] = useState<number>(0);
//   const [pageNumber, setPageNumber] = useState<number>(1);
//   const [scale, setScale] = useState(1.0);
//   const pageRefs = useRef<Record<number, HTMLDivElement | null>>({});

//   const zoomIn = () => setScale((prevScale) => Math.min(prevScale + 0.2, 3));
//   const zoomOut = () => setScale((prevScale) => Math.max(prevScale - 0.2, 0.5));

//   function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
//     setNumPages(numPages);
//   }

//   useEffect(() => {
//     const pageElement = pageRefs.current[pageNumber];
//     if (pageElement) {
//       pageElement.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   }, [pageNumber, numPages]);

//   return (
//     <div className="relative h-[calc(100vh-6rem)] w-full overflow-hidden bg-[#f5f5f4]">
//       <div className="mx-auto h-full w-full max-w-[980px] overflow-y-auto px-4 pb-28 pt-8">
//         <Document
//           file={materialData.url}
//           onLoadSuccess={onDocumentLoadSuccess}
//           className="flex flex-col items-center gap-6"
//           loading={<div className="py-8 text-center text-sm text-stone-500">Carregando PDF...</div>}
//         >
//           {Array.from({ length: numPages }, (_, index) => {
//             const currentPage = index + 1;

//             return (
//               <div
//                 key={currentPage}
//                 ref={(el) => {
//                   pageRefs.current[currentPage] = el;
//                 }}
//                 className={`flex w-full justify-center rounded-md ${
//                   currentPage === pageNumber ? "ring-2 ring-[#292524]/20" : ""
//                 }`}
//               >
//                 <Page
//                   pageNumber={currentPage}
//                   scale={scale}
//                   renderTextLayer={true}
//                   renderAnnotationLayer={true}
//                   className="shadow-sm"
//                 />
//               </div>
//             );
//           })}
//         </Document>
//       </div>

//       <PageActions
//         pageNumber={pageNumber}
//         setPageNumber={setPageNumber}
//         numPages={numPages}
//       />

//       <DocumentScale scale={scale} zoomIn={zoomIn} zoomOut={zoomOut} />
//     </div>
//   );
// }

// type PageActionsProps = {
//   pageNumber: number;
//   setPageNumber: (num: number) => void;
//   numPages?: number;
// };

// export function PageActions({ pageNumber, setPageNumber, numPages }: PageActionsProps) {
//   const maxPageNumber = Math.max(numPages ?? 1, 1);

//   return (
//     <div
//       className="absolute bottom-4 left-1/2 z-20 flex w-72 -translate-x-1/2 items-center justify-between gap-2 rounded-full border border-[#292524]/20 bg-white p-3 text-sm shadow-lg"
//       onClick={(e) => e.stopPropagation()}
//     >
//       <button
//         className="flex items-center gap-1 text-[#292524]/70 disabled:cursor-not-allowed disabled:opacity-50"
//         onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
//         disabled={pageNumber <= 1}
//       >
//         <ChevronLeft className="size-5" />
//         <span className="text-sm">Anterior</span>
//       </button>

//       <button
//         className="flex items-center gap-1 text-[#292524]/70 disabled:cursor-not-allowed disabled:opacity-50"
//         onClick={() => setPageNumber(Math.min(maxPageNumber, pageNumber + 1))}
//         disabled={pageNumber >= maxPageNumber}
//       >
//         <span className="text-sm">Próxima</span>
//         <ChevronRight className="size-5" />
//       </button>
//     </div>
//   );
// }

// type DocumentScaleProps = {
//   zoomOut: () => void;
//   zoomIn: () => void;
//   scale: number;
// };

// export function DocumentScale({ zoomOut, zoomIn, scale }: DocumentScaleProps) {
//   return (
//     <div className="fixed bottom-6 right-8 z-20 flex items-center gap-2 rounded-full bg-white p-2 text-gray-600 shadow-lg">
//       <button onClick={zoomOut} className="flex items-center justify-center p-1">
//         <Minus className="size-3" />
//       </button>
//       <span className="flex items-center justify-center text-xs">{(scale * 100).toFixed(0)}%</span>
//       <button onClick={zoomIn} className="flex items-center justify-center p-1">
//         <Plus className="size-3" />
//       </button>
//     </div>
//   );
// }