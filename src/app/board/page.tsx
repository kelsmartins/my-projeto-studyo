'use client';
import { FakeChat } from "@/src/components/chat/FakeChat";
import { StudyCard } from "@/src/components/studycard/StudyCard";
import { useStudyContext } from "@/src/contexts/StudyContext";
import { PlusCircle } from "lucide-react";
import { useState } from "react";


export default function Board() {

  const [showFakeChat, setShowFakeChat] = useState(false);

  const { studies } = useStudyContext()

  function handleShowFakeChat() {
    setShowFakeChat(!showFakeChat)
  }

  return (
    <div className="flex flex-col min-h-screen">

      <div className="w-full px-6 py-4 flex items-center justify-between text-[#292524]">

        <h2 className="font-bold text-xl">
          Mural de Cards
        </h2>

        <button
          className="flex items-center justify-center gap-1 px-3 py-2 bg-[#292524] rounded-lg text-[#D3CDBE] text-xs shadow-xl"
          onClick={handleShowFakeChat}>
          <PlusCircle size={14} className="font-bold" />
          estudo
        </button>

        {showFakeChat &&
          <FakeChat handleShowFakeChat={handleShowFakeChat} />
        }

      </div>

      <ul className="flex-1 grid grid-cols-[repeat(auto-fit,320px)] gap-5 p-4 overflow-y-auto justify-start">
        {studies.map((study, index) => (
          <StudyCard key={index} studyData={study} />
        ))}
      </ul>

    </div>
  );
}