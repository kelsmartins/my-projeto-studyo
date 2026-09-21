import { MaterialType } from "@/src/types/StudyType";
import { PdfViewer } from "./PdfViewer";
import { SessionMaterials } from "./SessionMaterials";

type MaterialAreaProps = {
    materials: MaterialType[]
}

export function MaterialArea({materials}: MaterialAreaProps){
    return (
        <div className='bg-purple-200 h-full w-[70%] flex flex-col'>
          <SessionMaterials />

          <div className='flex-1 bg-green-200 flex items-center justify-center p-10 overflow-auto'>
            <PdfViewer materialData={materials[0]} />
          </div>
    
        </div>
    )
}