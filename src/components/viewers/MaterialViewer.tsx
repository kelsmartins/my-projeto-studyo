"use client";

import { MaterialType } from "@/src/types/StudyType";


export type MaterialViewerProps = {
  materialData?: MaterialType;
  handleClose?: () => void;
};

export function MaterialViewer({ materialData, handleClose }: MaterialViewerProps) {
  return (
    <div
      className="h-full w-[50%] bg-red-400 overflow-y-auto">
        ...
    </div>
  )
}