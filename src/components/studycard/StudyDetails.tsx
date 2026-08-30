import { useStudyContext } from "@/src/contexts/StudyContext";
import { MaterialType, StudyType } from "@/src/types/StudyType";
import { Link, X } from "lucide-react";

type StudyDetailsProps = {
    handleShowDetails: () => void;
    studyData:  StudyType;
};

export function StudyDetails({ handleShowDetails, studyData }: StudyDetailsProps) {

    const { deleteMaterial } = useStudyContext();

    return (
        <div className="w-screen h-screen backdrop-blur-xs bg-black/20 absolute top-0 left-0 flex justify-center items-center"
        onClick={handleShowDetails}>
            <div className="w-100 min-h-120 bg-[#E3DDCE] rounded-xl shadow-lg flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>

                <div className="w-full h-4 rounded-t-xl" style={{backgroundColor: studyData.color_hex ? studyData.color_hex : '#292524' }}></div>

                <ul className="flex-1 p-4 overflow-y-auto">
                    {studyData.material?.map((material) => 
                        <StudySource key={material.id} material={material} borderColor={studyData.color_hex}/>
                    )}
                </ul>

            </div>  
        </div>
    )
}



type studySourceType = {
    material: MaterialType;
    borderColor: string
}
export function StudySource({material, borderColor}: studySourceType) {
    return (
        <div className="size-24 bg-[#D3CDBE] rounded-xl flex flex-col justify-center p-4 overflow-hidden" style={{ border: `1px solid ${borderColor ? borderColor : '#292524'}` }}>
            <button className="flex items-center justify-center absolute">
                <X className="size-6"/>
            </button>
            <Link className="size-6 mx-auto" style={{color: borderColor ? borderColor : '#292524' }} />
            <span className="text-xs truncate mt-1 break-words font-bold" style={{color: borderColor ? borderColor : '#292524' }}>{material.name}</span>
        </div>
    )
}