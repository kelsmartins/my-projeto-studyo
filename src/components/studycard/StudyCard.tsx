import { useState } from "react";
import { StudyDetails } from "./StudyDetails";
import { StudyType } from "@/src/types/StudyType";
import { File, Link } from "lucide-react";

type StudyCardProps = {
    studyData: StudyType
}

export function StudyCard({studyData}: StudyCardProps){

    const [showDetails, setShowDetails] = useState(false);

    function handleShowDetails() {
        setShowDetails(!showDetails);
    }

    return (
        <div className="w-70 max-w-full h-40 bg-[#E3DDCE] flex rounded-xl shadow-xl">

            <div className="w-4 h-full rounded-l-xl" style={{backgroundColor: studyData.color_hex ? studyData.color_hex : '#292524' }}></div>

            <div className="flex-1 flex flex-col justify-between p-4">

                <div className="w-full h-full flex flex-col">
                    <h2 className="text-[#292524] font-bold mb-1 text-md max-h-9 overflow-hidden tracking-tighter leading-none">{studyData.title}</h2>
                    <h3 className="text-[#292524] text-xs font-bold mb-1.5" style={{color: studyData.color_hex}}>{studyData.date}</h3>

                    {studyData.material?.some(material => material.type === 'file') ? <File className="size-5" style={{color: studyData.color_hex ? studyData.color_hex : '#292524' }} /> : ''}
                    {studyData.material?.some(material => material.type === 'link') ? <Link className="size-5" style={{color: studyData.color_hex ? studyData.color_hex : '#292524' }} /> : ''}

                </div>

                <div className="w-full h-10 flex items-center justify-end text-xs text-[#292524] gap-4">
                    <button className="font-bold hover:underline hover:cursor-pointer"
                    onClick={handleShowDetails}>
                        ver mais
                    </button>
                    <button className="px-3 py-2 rounded-lg font-semibold text-[#292524]" 
                    style={{backgroundColor: studyData.color_hex ? studyData.color_hex : '#292524' }}>
                        concluir
                    </button>
                </div>

            </div>

            {showDetails && <StudyDetails handleShowDetails={handleShowDetails} studyData={studyData}/>}
        
        </div>
    )
}