
"use client";

import { MaterialType } from "@/src/types/StudyType";
import {
    ChevronLeft,
    ChevronRight,
    Minus,
    Plus,
} from "lucide-react";
import { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
).toString();


export type PdfViewerProps = {
    materialData: MaterialType;
    handleClose?: () => void;
};


export function PdfViewer({
    materialData,
    handleClose,
}: PdfViewerProps) {

    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [scale, setScale] = useState(1.0);


    // =========================
    // ZOOM
    // =========================

    const zoomIn = () => {
        setScale((prevScale) =>
            Math.min(prevScale + 0.2, 3)
        );
    };

    const zoomOut = () => {
        setScale((prevScale) =>
            Math.max(prevScale - 0.2, 0.5)
        );
    };


    // =========================
    // PDF CARREGADO
    // =========================

    function onDocumentLoadSuccess({
        numPages,
    }: {
        numPages: number;
    }): void {
        setNumPages(numPages);
    }


    return (
        <>
            {/* ==========================================
                PDF
            ========================================== */}

            <div className="w-fit mx-auto">

                <Document
                className="mt-50"
                    file={materialData.url}
                    onLoadSuccess={onDocumentLoadSuccess}
                >

                    <Page
                        pageNumber={pageNumber}
                        scale={scale}
                    />

                </Document>

            </div>


            {/* ==========================================
                CONTROLES
            ========================================== */}

            <PdfControls
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                numPages={numPages}
                scale={scale}
                zoomIn={zoomIn}
                zoomOut={zoomOut}
            />
        </>
    );
}



// ======================================================
// CONTROLES DO PDF
// ======================================================
type PdfControlsProps = {
    pageNumber: number;
    setPageNumber: (num: number) => void;
    numPages: number;
    scale: number;
    zoomIn: () => void;
    zoomOut: () => void;
};

export function PdfControls({
    pageNumber,
    setPageNumber,
    numPages,
    scale,
    zoomIn,
    zoomOut,
}: PdfControlsProps) {

    const goToPage = (value: string) => {
        const page = Number(value);

        if (!Number.isInteger(page)) return;
        if (page < 1) return;
        if (page > numPages) return;

        setPageNumber(page);
    };


    return (
        <div
            className="
                fixed
                bottom-6
                left-[40%]
                -translate-x-1/2

                h-11
                px-2

                bg-white
                rounded-xl

                border
                border-[#292524]/10
                shadow-[0_4px_20px_rgba(0,0,0,0.08)]

                flex
                items-center

                text-[#292524]/70

                z-50
            "
        >

            {/* ==========================================
                NAVEGAÇÃO
            ========================================== */}

            <div className="flex items-center">

                {/* ANTERIOR */}

                <button
                    type="button"
                    onClick={() => {
                        if (pageNumber > 1) {
                            setPageNumber(pageNumber - 1);
                        }
                    }}
                    disabled={pageNumber <= 1}
                    className="
                        h-8
                        px-2.5

                        flex
                        items-center
                        gap-1

                        rounded-lg

                        text-xs
                        font-medium

                        hover:bg-[#292524]/5
                        active:bg-[#292524]/10

                        disabled:opacity-30
                        disabled:hover:bg-transparent

                        transition
                    "
                >
                    <ChevronLeft className="size-4" />

                    <span>
                        Anterior
                    </span>
                </button>


                {/* PÁGINA */}

                <div className="flex items-center gap-1.5 px-2">

                    <input
                        type="number"
                        min={1}
                        max={numPages}
                        value={pageNumber}
                        onChange={(e) => {
                            const value = e.target.value;

                            if (value === "") return;

                            const page = Number(value);

                            if (
                                Number.isInteger(page) &&
                                page >= 1 &&
                                page <= numPages
                            ) {
                                setPageNumber(page);
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                goToPage(e.currentTarget.value);
                                e.currentTarget.blur();
                            }
                        }}
                        className="
                            w-9
                            h-7

                            px-1

                            text-center
                            text-xs
                            font-medium

                            bg-[#292524]/5

                            rounded-md

                            border
                            border-transparent

                            outline-none

                            focus:bg-white
                            focus:border-[#292524]/20

                            transition
                        "
                    />

                    <span className="text-xs text-[#292524]/40">
                        /
                    </span>

                    <span className="text-xs text-[#292524]/50 min-w-5">
                        {numPages}
                    </span>

                </div>


                {/* PRÓXIMA */}

                <button
                    type="button"
                    onClick={() => {
                        if (pageNumber < numPages) {
                            setPageNumber(pageNumber + 1);
                        }
                    }}
                    disabled={pageNumber >= numPages}
                    className="
                        h-8
                        px-2.5

                        flex
                        items-center
                        gap-1

                        rounded-lg

                        text-xs
                        font-medium

                        hover:bg-[#292524]/5
                        active:bg-[#292524]/10

                        disabled:opacity-30
                        disabled:hover:bg-transparent

                        transition
                    "
                >

                    <span>
                        Próxima
                    </span>

                    <ChevronRight className="size-4" />

                </button>

            </div>


            {/* ==========================================
                DIVISÓRIA
            ========================================== */}

            <div className="h-5 w-px bg-[#292524]/10 mx-1" />


            {/* ==========================================
                ZOOM
            ========================================== */}

            <div className="flex items-center">

                {/* DIMINUIR */}

                <button
                    type="button"
                    onClick={zoomOut}
                    disabled={scale <= 0.5}
                    className="
                        size-8

                        flex
                        items-center
                        justify-center

                        rounded-lg

                        hover:bg-[#292524]/5
                        active:bg-[#292524]/10

                        disabled:opacity-30
                        disabled:hover:bg-transparent

                        transition
                    "
                >
                    <Minus className="size-3.5" />
                </button>


                {/* PORCENTAGEM */}

                <span
                    className="
                        w-11
                        text-center

                        text-xs
                        font-medium

                        text-[#292524]/60
                    "
                >
                    {(scale * 100).toFixed(0)}%
                </span>


                {/* AUMENTAR */}

                <button
                    type="button"
                    onClick={zoomIn}
                    disabled={scale >= 3}
                    className="
                        size-8

                        flex
                        items-center
                        justify-center

                        rounded-lg

                        hover:bg-[#292524]/5
                        active:bg-[#292524]/10

                        disabled:opacity-30
                        disabled:hover:bg-transparent

                        transition
                    "
                >
                    <Plus className="size-3.5" />
                </button>

            </div>

        </div>
    );
}