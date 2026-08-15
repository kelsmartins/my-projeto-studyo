import { StudyCard } from "@/src/components/studycard/StudyCard";


export default function Board() {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-[#E3DDCE]">

        <div className="w-full h-14 bg-red-500">

        </div>

        <div className="flex-1 p-4">
            <StudyCard />
        </div>
    </div>
  );
}