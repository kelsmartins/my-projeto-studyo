"use client";

import { MaterialType } from "@/src/types/StudyType";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    handleClose: () => void;
};


export function PdfViewer({materialData, handleClose}: PdfViewerProps) {
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    return (
            <div
                className="flex flex-col w-[42%] h-full">

                <Document
                    className="w-full h-full bg-white rounded-lg shadow-lg overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    file={materialData.url}
                    onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} />
                </Document>


                <div
                    className="w-40 h-10 absolute left-1/2 -translate-x-1/2 bottom-8 text-white text-sm bg-black/60 px-2 py-1 rounded-md flex items-center justify-between gap-2"
                    onClick={(e) => e.stopPropagation()}>

                    <button>
                        <ChevronLeft
                            className="flex items-center justify-center"
                            onClick={() => {
                                if (pageNumber > 1) {
                                    setPageNumber(pageNumber - 1)
                                }
                            }} />
                    </button>
                    <button
                        className="flex items-center justify-between gap-1">

                        {pageNumber}
                        <span> de </span>
                        {numPages}

                    </button>
                    <button className="flex items-center justify-center">
                        <ChevronRight className="inline-block mr-2" onClick={() => {
                            if (pageNumber < (numPages || 1)) {
                                setPageNumber(pageNumber + 1)
                            }
                        }} />
                    </button>
                </div>

            </div>
    )
}