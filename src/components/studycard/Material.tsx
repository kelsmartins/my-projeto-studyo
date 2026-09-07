import { useStudyContext } from "@/src/contexts/StudyContext";
import { MaterialType} from "@/src/types/StudyType";
import { CircleX, Link } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const MaterialPreview = dynamic(
    () => import("../materials/MaterialPreview").then(({ MaterialPreview }) => MaterialPreview),
    { ssr: false },
);

type MaterialProps = {
    thisColor: string;
    studyId: string;
    thisMaterial: MaterialType
    handleClose: () => void;
}
export function Material({ thisColor, studyId, thisMaterial, handleClose }: MaterialProps) {

    const { deleteMaterial } = useStudyContext();
    const [showMaterialViewer, setShowMaterialViewer] = useState(false);

    return (
        <div 
            className="size-24 rounded-xl flex flex-col justify-center p-4 overflow-hidden relative" style={{ border: `1px solid ${thisColor ? thisColor : '#292524'}` }}
            onClick={()=> setShowMaterialViewer(true)}>
            
            <button className="absolute top-1 right-1 flex items-center justify-center size-6 rounded-md text-[#292524]/50 hover:bg-red-200 hover:text-red-600 transition-colors"
            onClick={(e)=>{
                e.stopPropagation();
                window.alert("Apagando material..."); 
                deleteMaterial(studyId, thisMaterial.id)
                }}>
                <CircleX className="size-4.5" style={{ color: thisColor ? thisColor : '#292524' }} />
            </button>

            <div className="flex flex-col items-center justify-center size-full">
                <Link className="size-5 mx-auto" style={{ color: thisColor ? thisColor : '#292524' }} />
                <span className="w-full min-w-0 text-xs truncate mt-1 font-bold text-center" style={{ color: thisColor ? thisColor : '#292524' }}>{thisMaterial.name}</span>
            </div>

            {showMaterialViewer && (
                <MaterialPreview materialData={thisMaterial} handleClose={handleClose} />
            )}
        </div>
    )
}


