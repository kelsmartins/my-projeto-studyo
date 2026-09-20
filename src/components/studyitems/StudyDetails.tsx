import { StudyType } from "@/src/types/StudyType";
import { Material } from "./Material";

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

                <h2 className="text-sm font-bold m-auto mt-2 text-[#292524]">{studyData.title}</h2>
                <h3 className="text-sm m-auto font-bold" style={{ color: studyData.color_hex ? studyData.color_hex : '#292524' }}>
                    {studyData.date}
                </h3>

                <ul className="flex-1 p-4 overflow-y-auto flex flex-wrap gap-3 justify-start">
                    {studyData.material?.map((material, index ) =>
                        <Material key={index} thisColor={studyData.color_hex} studyId={studyData.id} thisMaterial={material} handleClose={handleShowDetails} />
                    )}
                </ul>

            </div>
        </div>
    )
}
