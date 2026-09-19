import { useState } from "react";
import { StudyMaterials } from "./StudyMaterials";
import { StudyType } from "@/src/types/StudyType";
import { useStudyContext } from "@/src/contexts/StudyContext";
import { Check, ChevronDown, Play, RotateCcw, StepBack, Trash } from "lucide-react";

type StudyItemProps = {
    studyData: StudyType
}

export function StudyItem({ studyData }: StudyItemProps) {

    const [showMaterials, setShowMaterials] = useState(false);
    const { checkDoneStudy, deleteStudy } = useStudyContext();

    function handleShowMaterials() {
        setShowMaterials(!showMaterials);
    }

    return (
        <div
            className="w-[80%] mx-auto h-30 relative bg-[#F9FBFC] flex rounded-md border border-[#292524]/20"
            style={{ borderLeft: studyData.color_hex ? `4px solid ${studyData.color_hex}` : undefined }}
        >

            <div className="flex-1 flex flex-col p-4 ">

                <div className="w-full h-5 flex justify-between mb-2">
                    <h3
                        className="text-[#292524] text-sm font-bold mb-1.5"
                        style={{ color: studyData.color_hex ?? "#292524" }}
                    >
                        {studyData.date}
                    </h3>
                    <p></p>
                </div>

                <h2 className="text-[#292524] font-bold mb-1 text-md truncate">{studyData.title}</h2>
                
                <button className="text-xs font-bold mt-2 flex gap-1"
                    style={{ color: studyData.color_hex ? `${studyData.color_hex}` : '#292524' }}
                    onClick={handleShowMaterials}>
                    <ChevronDown className="text-green-600 size-4 font-bold"
                        style={{ color: studyData.color_hex ? `${studyData.color_hex}` : '#292524' }} />
                    2 materiais
                </button>


            </div>

            {studyData.done == false ?

                <div className="h-full w-30 flex flex-col items-center justify-center gap-4 border-l border-l-[#292524]/20">

                    <button className="rounded-full flex items-center justify-center size-6 border border-[#292524]/30"
                        onClick={handleShowMaterials}>
                        <Play className="text-green-600 size-3"
                            style={{ color: studyData.color_hex ? `${studyData.color_hex}` : '#292524' }} />
                    </button>

                    <button
                        className="rounded-full flex items-center justify-center size-6 border border-[#292524]/30"
                        onClick={() => checkDoneStudy(studyData.id)}>
                        < Check className="text-green-600 size-3"
                            style={{ color: studyData.color_hex ? `${studyData.color_hex}` : '#292524' }} />
                    </button>
                </div>

                :

                <div className="h-full w-30 flex flex-col items-center justify-center gap-4 border-l border-l-[#292524]/20">

                    <button className="rounded-full flex items-center justify-center size-6 border border-[#292524]/30"
                        onClick={handleShowMaterials}>
                        <RotateCcw className="text-green-600 size-3"
                            style={{ color: studyData.color_hex ? `${studyData.color_hex}` : '#292524' }} />
                    </button>

                    <button
                        className="rounded-full flex items-center justify-center size-6 border border-[#292524]/30"
                        onClick={() => deleteStudy(studyData.id)}>
                        <Trash className="text-green-600 size-3"
                            style={{ color: studyData.color_hex ? `${studyData.color_hex}` : '#292524' }} />
                    </button>
                </div>

            }

            {showMaterials && <StudyMaterials handleShowDetails={handleShowMaterials} studyData={studyData} />}

        </div>
    )
}