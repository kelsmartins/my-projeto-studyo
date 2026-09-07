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

type MaterialViewerProps = {
    materialData: MaterialType;
};

export function MaterialViewer({ materialData }: MaterialViewerProps) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div className="w-screen h-screen bg-red-200 fixed top-0 left-0 flex justify-center items-center p-4 overflow-hidden">
      <Document 
        className="w-[42%] h-full bg-white rounded-lg shadow-lg overflow-y-auto"
        file={materialData.url} 
        onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <div className="w-40 h-10 absolute bottom-8 text-white text-sm bg-black/60 px-2 py-1 rounded-md flex items-center justify-between">
        <button>
          <ChevronLeft 
            className="inline-block mr-2" 
            onClick={() => {
              if(pageNumber > 1) {
                setPageNumber(pageNumber - 1)
              }
            }} />
        </button>
        <p>{pageNumber} / {numPages}</p>
        <button>
          <ChevronRight className="inline-block mr-2" onClick={() => {
            if(pageNumber < (numPages || 1)) {
              setPageNumber(pageNumber + 1)
            }
          }} />
        </button>
      </div>
    </div>
  );
}