'use client';
import { StudyCard } from "@/src/components/studycard/StudyCard";
import { useStudyContext } from "@/src/contexts/StudyContext";
import { Trash2Icon } from "lucide-react";


export default function DoneStudies() {


    const { doneStudies } = useStudyContext()


    return (
        <div className="flex flex-col min-h-screen">

            <div className="w-full flex items-center justify-between text-[#292524] px-6 py-4">

                <h2 className="font-bold text-xl">
                    Estudos concluídos
                </h2>

                <button
          className="flex items-center justify-center gap-1 px-3 py-2 bg-[#292524] rounded-lg text-[#D3CDBE] text-xs shadow-xl"
          onClick={()=>{}}>
          <Trash2Icon size={14} className="font-bold" />
          todos
        </button>

            </div>

            <ul className="flex p-4">
                {doneStudies.map((study, index) => (
                    <StudyCard key={index} studyData={study} />
                ))}
            </ul>

        </div>
    );
}