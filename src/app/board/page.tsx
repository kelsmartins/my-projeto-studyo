'use client';
import { StudyCard } from "@/src/components/studycard/StudyCard";
import { StudyDetails } from "@/src/components/studycard/StudyDetails";


export default function Board() {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-[#D3CDBE]">

        <div className="w-full h-14 bg-red-500">

        </div>

        <div className="flex-1 p-4">
            <StudyCard />
        </div>
    </div>
  );
}