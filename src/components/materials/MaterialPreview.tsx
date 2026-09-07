'use client';

import { MaterialType } from '@/src/types/StudyType';
import dynamic from 'next/dynamic';

const FilePreview = dynamic(() => import('reactjs-file-preview'), { ssr: false });

type MaterialPreviewProps = {
    materialData: MaterialType;
    handleClose: () => void;
}

export function MaterialPreview({ materialData, handleClose }: MaterialPreviewProps){

    return (
            <div
      className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center p-4 overflow-hidden backdrop-"
      onClick={handleClose}>
        <div className="pointer-events-none w-60 h-80 shadow-2xl">
          <FilePreview preview={materialData.url ?? null} />
        </div>
      </div>
    )

}