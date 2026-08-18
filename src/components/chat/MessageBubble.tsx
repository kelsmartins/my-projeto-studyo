import { StudyType } from "@/types/StudyType";
import {X, Check} from 'lucide-react'

type MessageBubbleProps = {
  studyData: StudyType | null | undefined;
}

export function MessageBubble({ studyData }: MessageBubbleProps) {
  return (
    <div
      className="bg-[#E3DDCE] p-4 rounded-xl mb-2 max-w-[400px] shadow-sm flex flex-col">

      <h4 className="m-0 mb-1 font-bold text-[#292524]">
        {studyData?.title}
      </h4>

      <p className="m-0 mt-0 mb-1 text-sm font-bold text-[#292524]/80"
      style={{ color: studyData?.color_hex}}>{studyData?.date instanceof Date ? studyData.date.toLocaleDateString() : studyData?.date}</p>

      <p className="m-0 mt-0 mb-1 text-sm font-bold text-[#292524]/80">Materiais:</p>
      {studyData?.materials && studyData.materials.length > 0 && (
        <ul className=" m-0 mb-4">
          {studyData.materials.map((m, i) => (
            <li key={i}
              className="italic text-[#292524]/70 text-sm truncate">
              {m.type === "file" ? "📄 Arquivo:" : "🔗 Link:"} {m.name}
            </li>
          ))}
        </ul>
      )}

      <div className="w-full h-10 flex items-center justify-end text-xs text-[#292524] gap-4">

        <button className="font-bold hover:underline hover:cursor-pointer flex"

          onClick={() => { }}>

          <X size={16} className="text-[#292524]" />
          descartar
        </button>

        <button className="px-3 py-2 bg-[#292524] rounded-lg font-semibold text-white flex">
          <Check size={16} className="text-white" />
          criar
        </button>

      </div>

    </div>
  );
}