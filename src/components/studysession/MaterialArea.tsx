import { MaterialType } from "@/src/types/StudyType";
import { PdfViewer } from "./PdfViewer";
import { SessionMaterials } from "./SessionMaterials";

type MaterialAreaProps = {
    materials: MaterialType[]
}

export function MaterialArea({materials}: MaterialAreaProps){
    return (
        <main className="h-full w-[70%] bg-blue-400 flex overflow-y-auto">
            <SessionMaterials />
           <PdfViewer materialData={materials[0]}/>
        </main>
    )
}