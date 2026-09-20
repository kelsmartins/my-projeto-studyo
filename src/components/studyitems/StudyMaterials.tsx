import { StudyType } from "@/src/types/StudyType";
import { MaterialItem } from "./Materialitem";

type StudyMaterialsProps = {
    handleShowDetails: () => void;
    studyData: StudyType;
};

export function StudyMaterials({ handleShowDetails, studyData }: StudyMaterialsProps) {

    return (
            <ul className="absolute -bottom-20 left-2 w-[72%] h-25 z-10 rounded-md shadow-lg overflow-y-hidden bg-[#fff] flex flex-col p-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {studyData.material?.map((material, index ) =>
                        <MaterialItem 
                            key={index} 
                            studyId={studyData.id} 
                            thisColor={studyData.color_hex} 
                            thisMaterial={material}
                            handleClose={handleShowDetails}
                            />
                    )}
                </ul>
    )
}
