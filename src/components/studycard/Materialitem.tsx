import { useStudyContext } from "@/src/contexts/StudyContext";
import { MaterialType } from "@/src/types/StudyType";
import { CircleX, File, Link, Link2, X } from "lucide-react";
import { useState } from "react";
// import { MaterialPreview } from "../materialviewers/MaterialPreview";


type MaterialItemProps = {
    thisColor: string;
    studyId: string;
    thisMaterial: MaterialType
    handleClose: () => void;
}

export function MaterialItem({ thisColor, studyId, thisMaterial, handleClose }: MaterialItemProps) {

    const { deleteMaterial } = useStudyContext();

    return (
        <div className="w-full h-10 flex justify-between items-center gap-2 p-1">
            {thisMaterial.type === 'string' ?
                <Link2 
                    className="size-4 text-red-400" 
                    style={{color: thisColor}}
                />
                :
                <File 
                    className="size-4 text-red-400" 
                    style={{color: thisColor}}
                />
                    }
            <span className="flex items-center justify-start w-full truncate text-[#292524]/70 text-sm">ola</span>
            <button 
                className="bg-transparent flex items-center justify-center">
                <X className="size-4 text-red-400" 
                    style={{color: thisColor}}
                />
            </button>
        </div>
    )
}




