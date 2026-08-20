import { useState } from "react";
import { StudyDetails } from "./StudyDetails";
import { StudyType } from "@/src/types/StudyType";

type StudyCardProps = {
    studyData: StudyType
}

export function StudyCard({studyData}: StudyCardProps){

    const [showDetails, setShowDetails] = useState(false);

    function handleShowDetails() {
        setShowDetails(!showDetails);
    }

    return (
        <div className="w-70 h-40 bg-[#E3DDCE] flex justify-between rounded-xl shadow-xl">

            <div className="w-4 h-full rounded-l-xl" style={{backgroundColor: studyData.color_hex}}></div>

            <div className="flex flex-col justify-between p-4">

                <div className="w-full h-full flex flex-col">
                    <h2 className="text-[#292524] font-bold mb-1 text-md max-h-9 overflow-hidden tracking-tighter leading-none">{studyData.title}</h2>
                    <h3 className="text-[#ff0000] text-xs font-bold" style={{backgroundColor: studyData.color_hex}}>{studyData.date.toDateString()}</h3>
                </div>

                <div className="w-full h-10 flex items-center justify-between text-xs text-[#292524]">
                    <button className="font-bold hover:underline hover:cursor-pointer"
                    onClick={handleShowDetails}>
                        ver mais
                    </button>
                    <button className="px-3 py-2 bg-[#ff0000] rounded-lg font-semibold text-white">concluir</button>
                </div>

            </div>

            {showDetails && <StudyDetails handleShowDetails={handleShowDetails} />}
        
        </div>
    )
}