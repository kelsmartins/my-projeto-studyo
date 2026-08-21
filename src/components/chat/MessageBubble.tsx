import { useStudyContext } from "@/src/contexts/StudyContext";
import { ParsedStudyType } from "@/src/types/ParsedStudyType";
import {X, Check} from 'lucide-react'

type MessageBubbleProps = {
  studyData: ParsedStudyType | null | undefined;
}

export function MessageBubble({ studyData }: MessageBubbleProps) {

  const {addStudy, discardParsedStudy} = useStudyContext();

  function handleAddStudy(){
    if(studyData){
      addStudy(studyData);
    }
  }

  function handleDiscardParsedStudy(){
    discardParsedStudy();

  }

  return (
    <div
      className="bg-[#E3DDCE] p-4 rounded-xl mb-2 max-w-[400px] shadow-sm flex flex-col">

      <h4 className="m-0 mb-1 font-bold text-[#292524]">
        {studyData?.title}
      </h4>

      <p className="m-0 mt-0 mb-1 text-sm font-bold text-[#292524]/80"
      style={{ color: studyData?.color_hex}}>{studyData?.date ? studyData.date : studyData?.date}</p>

      <p className="m-0 mt-0 mb-1 text-sm font-bold text-[#292524]/80">Materiais:</p>
      {studyData?.material && studyData.material.length > 0 && (
        <ul className=" m-0 mb-4">
          {studyData.material.map((m, i) => (
            <li key={i}
              className="italic text-[#292524]/70 text-sm truncate">
              {m.type === "file" ? "📄 Arquivo:" : "🔗 Link:"} {m.name}
            </li>
          ))}
        </ul>
      )}

      <div className="w-full h-10 flex items-center justify-end text-xs text-[#292524] gap-4">

        <button className="font-bold hover:underline hover:cursor-pointer flex"

          onClick={handleDiscardParsedStudy}>

          <X size={16} className="text-[#292524]" />
          descartar
        </button>

        <button className="px-3 py-2 bg-[#292524] rounded-lg font-semibold text-white flex"
        onClick={handleAddStudy}>
          <Check size={16} className="text-white" />
          criar
        </button>

      </div>

    </div>
  );
}