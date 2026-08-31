import { useState } from "react";
import { StudyDetails } from "./StudyDetails";
import { StudyType } from "@/src/types/StudyType";
import { File, Link } from "lucide-react";
import { useStudyContext } from "@/src/contexts/StudyContext";

type StudyCardProps = {
    studyData: StudyType
}

export function StudyCard({ studyData }: StudyCardProps) {

    const [showDetails, setShowDetails] = useState(false);
    const {checkDoneStudy} = useStudyContext();

    function handleShowDetails() {
        setShowDetails(!showDetails);
    }

    return (
        <div className="w-full max-w-xs h-40 bg-[#faf6ed] flex rounded-md border border-[#292524]/15 shadow-sm">

            <div className="w-1.5 h-full rounded-l-xl" style={{ backgroundColor: studyData.color_hex ? studyData.color_hex : '#292524' }}></div>

            <div className="flex-1 flex flex-col justify-between p-4">

                <div className="w-full h-full flex flex-col">
                    <h2 className="text-[#292524] font-bold mb-1 text-md max-h-9 overflow-hidden tracking-tighter leading-none">{studyData.title}</h2>
                    <h3 className="text-[#292524] text-sm font-bold mb-1.5" style={{ color: studyData.color_hex }}>{studyData.date}</h3>

                    {studyData.material?.some(material => material.type === 'file') ? <File className="size-4.5" style={{ color: studyData.color_hex ? studyData.color_hex : '#292524' }} /> : ''}
                    {studyData.material?.some(material => material.type === 'link') ? <Link className="size-4.5" style={{ color: studyData.color_hex ? studyData.color_hex : '#292524' }} /> : ''}

                </div>

                <div className="w-full h-10 flex items-center justify-end text-xs text-[#292524]/90 gap-4">
                    <button className="font-medium hover:underline hover:cursor-pointer"
                        onClick={handleShowDetails}>
                        ver mais
                    </button>
                    <button 
                    className="font-medium text-xs px-3.5 py-1.5 border border-[#2B2A24]/30 bg-transparent rounded-md text-[#292524] hover:bg-[#2B2A24] hover:text-[#F5F1E6] transition-colors"
                    onClick={()=> checkDoneStudy(studyData.id)}>
                        concluir
                    </button>
                </div>

            </div>

            {showDetails && <StudyDetails handleShowDetails={handleShowDetails} studyData={studyData} />}

        </div>
    )
}