import { MaterialType } from "@/src/types/StudyType";
import { PdfViewer } from "./PdfViewer";
import { SessionMaterials } from "./SessionMaterials";

type MaterialAreaProps = {
    materials: MaterialType[]
}

export function MaterialArea({materials}: MaterialAreaProps){
    return (
        <div className='bg-gray-200 h-full w-[75%] flex flex-col'>
          <SessionMaterials materials={materials}/>

          <div className='flex-1 flex items-center justify-center p-10 overflow-hidden'>
            <PdfViewer materialData={materials[0]} />
          </div>
    
        </div>
    )
}