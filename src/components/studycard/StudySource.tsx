import { useStudyContext } from "@/src/contexts/StudyContext";
import { MaterialType, StudyType } from "@/src/types/StudyType";
import { Link, Trash2 } from "lucide-react";

type studySourceType = {
    studyData: StudyType;
    thisMaterial: MaterialType
}
export function StudySource({ studyData, thisMaterial }: studySourceType) {

    const { deleteMaterial } = useStudyContext();

    return (
        <div className="size-24 rounded-xl flex flex-col justify-center p-4 overflow-hidden relative" style={{ border: `1px solid ${studyData.color_hex ? studyData.color_hex : '#292524'}` }}>
            <button className="absolute top-1 right-1 flex items-center justify-center size-6 rounded-md text-[#292524]/50 hover:bg-red-100 hover:text-red-600 transition-colors"
            onClick={()=>deleteMaterial(studyData.id, thisMaterial.id)}>
                <Trash2 className="size-3.5" />
            </button>
            <Link className="size-6 mx-auto" style={{ color: studyData.color_hex ? studyData.color_hex : '#292524' }} />
            <span className="text-xs truncate mt-1 break-words font-bold" style={{ color: studyData.color_hex ? studyData.color_hex : '#292524' }}>{thisMaterial.name}</span>
        </div>
    )
}