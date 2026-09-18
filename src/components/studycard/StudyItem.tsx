import { useState } from "react";
import { StudyDetails } from "./StudyDetails";
import { StudyType } from "@/src/types/StudyType";
import { useStudyContext } from "@/src/contexts/StudyContext";
import { Check, Play } from "lucide-react";

type StudyItemProps = {
    studyData: StudyType
}

export function StudyItem({ studyData }: StudyItemProps) {

    const [showDetails, setShowDetails] = useState(false);
    const { checkDoneStudy, deleteStudy } = useStudyContext();

    function handleShowDetails() {
        setShowDetails(!showDetails);
    }

    return (
        <div className={`w-full h-30 bg-[#F9FBFC] flex rounded-md border-l-3 border-l-[${studyData.color_hex}]`}>

            <div className="flex-1 flex flex-col p-4 ">

                <div className="w-full h-5 flex justify-between mb-2">
                    <h3 className="text-[#292524] text-sm font-bold mb-1.5" style={{ color: studyData.color_hex }}>{studyData.date}</h3>
                    <p>Enem</p>
                </div>

                <h2 className="text-[#292524] font-bold mb-1 text-md truncate">{studyData.title}</h2>
                <p className="text-xs font-bold mt-2">2 materiais</p>


            </div>

            {studyData.done == false ?

                <div className="h-full w-30 flex flex-col items-center justify-center gap-4 border-l border-l-[#292524]">

                    <button className="rounded-full flex items-center justify-center size-8"
                        onClick={handleShowDetails}>
                        <Play />
                    </button>

                    <button
                        className="rounded-full flex items-center justify-center size-8"
                        onClick={() => checkDoneStudy(studyData.id)}>
                        < Check />
                    </button>
                </div>

                :

                <div className="h-full w-30 flex flex-col items-center justify-center gap-4 border-l border-l-[#292524]/10">

                    <button className="rounded-full flex items-center justify-center border border-[#292524]/10"
                        onClick={handleShowDetails}>
                        Restaurar
                    </button>

                    <button
                        className="rounded-full flex items-center justify-center"
                        onClick={() => deleteStudy(studyData.id)}>
                        Excluir
                    </button>
                </div>

            }

            {showDetails && <StudyDetails handleShowDetails={handleShowDetails} studyData={studyData} />}

        </div>
    )
}