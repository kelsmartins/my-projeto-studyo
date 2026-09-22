"use client";

import { MaterialType } from "@/src/types/StudyType";
import { Minus, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type PdfViewerProps = {
  materialData: MaterialType;
  handleClose?: () => void;
};

// export function PdfViewer({ materialData, handleClose }: PdfViewerProps) {
//   );
// }