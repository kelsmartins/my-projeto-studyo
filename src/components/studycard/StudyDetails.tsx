import { MaterialType, StudyType } from "@/src/types/StudyType";
import { Link } from "lucide-react";

type StudyDetailsProps = {
    handleShowDetails: () => void;
    studyData:  StudyType;
};

export function StudyDetails({ handleShowDetails, studyData }: StudyDetailsProps) {


    return (
        <div className="w-screen h-screen backdrop-blur-xs absolute top-0 left-0 flex justify-center items-center"
        onClick={handleShowDetails}>
            <div className="w-100 min-h-120 bg-[#E3DDCE] rounded-xl shadow-lg flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>

                <div className="w-full h-4 bg-[#ff0000] rounded-t-xl"></div>

                <ul className="flex-1 p-4 overflow-y-auto">
                    {studyData.material?.map((material, index) => 
                        <StudySource key={index} material={material}/>
                    )}
                </ul>

            </div>  
        </div>
    )
}



type studySourceType = {
    material: MaterialType
}
export function StudySource({material}: studySourceType) {
    return (
        <div className="size-24 bg-[#D3CDBE] rounded-xl flex flex-col justify-center p-4 overflow-hidden">
            <Link className="text-[#ff0000] size-6 mx-auto" />
            <span className="text-[#ff0000] text-xs truncate mt-1 break-words font-bold">{material.name}</span>
        </div>
    )
}