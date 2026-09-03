import { useStudyContext } from "@/src/contexts/StudyContext";
import { MaterialType, StudyType } from "@/src/types/StudyType";
import { Link, Trash2 } from "lucide-react";

type StudyDetailsProps = {
    handleShowDetails: () => void;
    studyData: StudyType;
};

export function StudyDetails({ handleShowDetails, studyData }: StudyDetailsProps) {

    return (
        <div className="w-screen h-screen backdrop-blur-xs bg-black/20 absolute top-0 left-0 flex justify-center items-center"
            onClick={handleShowDetails}>
            <div className="w-100 min-h-120 bg-[#F9FBFC] rounded-lg shadow-lg flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>

                <div className="w-full h-2 rounded-t-xl" style={{ backgroundColor: studyData.color_hex ? studyData.color_hex : '#292524' }}></div>

                <ul className="flex-1 p-4 overflow-y-auto flex flex-wrap gap-3 justify-start">
                    {studyData.material?.map((material, index ) =>
                        <StudySource key={index} studyData={studyData} thisMaterial={material} />
                    )}
                </ul>

            </div>
        </div>
    )
}



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