'use client';
import { FakeChat } from "@/src/components/chat/FakeChat";
import { StudyCard } from "@/src/components/studycard/StudyCard";
import { useStudyContext } from "@/src/contexts/StudyContext";
import { PlusCircle } from "lucide-react";
import { useState } from "react";


export default function Board() {

  const [showFakeChat, setShowFakeChat] = useState(false);

  const {studies} = useStudyContext()

  function handleShowFakeChat(){
    setShowFakeChat(!showFakeChat)
  }

  return (
    <div className="flex flex-col justify-between min-h-screen bg-[#D3CDBE]">

        <div className="w-full h-14 p-6 flex items-center justify-between text-[#292524]">

          <h2 className=" font-bold text-xl">
            Mural de Cards
          </h2>

          <button 
          className="flex items-center justify-center gap-1 px-2 py-1 bg-[#292524] rounded-lg text-[#D3CDBE] shadow-xl"
          onClick={handleShowFakeChat}>
            <PlusCircle size={18} className=" font-bold"/>
            estudo
          </button>

          {showFakeChat && 
            <FakeChat handleShowFakeChat={handleShowFakeChat} />
          }

        </div>

        <ul className="flex-1 p-4">
            {studies.map(study => (
              <StudyCard key={study.id} studyData={study}/>
            )) }
        </ul>
    </div>
  );
}