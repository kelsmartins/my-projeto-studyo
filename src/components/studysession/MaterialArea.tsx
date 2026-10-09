import { MaterialType } from "@/src/types/StudyType";
import { PdfViewer } from "./PdfViewer";
import { SessionMaterials } from "./SessionMaterials";
import { VideoViewer } from "./VideoViewer";

type MaterialAreaProps = {
    materials: MaterialType[]
}

export function MaterialArea({materials}: MaterialAreaProps){
    return (
        <div className='bg-gray-200 h-full w-[60%] flex flex-col'>
          <SessionMaterials materials={materials}/>

          <div className='flex-1 flex items-center justify-center overflow-y-auto'>
             <PdfViewer materialData={materials[0]} />
            {/* <VideoViewer /> */}
          </div>
    
        </div>
    )
}