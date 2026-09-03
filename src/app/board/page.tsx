'use client';
import { FakeChat } from "@/src/components/chat/FakeChat";
import { PageHeader } from "@/src/components/pages/PageHeader";
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
      
      <PageHeader  title="Mural de Cards" subtitle="Seu espaço de estudos" buttonElement={<PlusCircle size={16} />} buttonText="Novo estudo" handleShow={handleShowFakeChat} state={showFakeChat} elementToShow={<FakeChat handleShowFakeChat={handleShowFakeChat} />} />

      <ul className="flex-1 grid grid-cols-[repeat(auto-fit,320px)] gap-5 p-4 overflow-y-auto justify-start">
        {studies.map((study, index) => (
          <StudyCard key={index} studyData={study} />
        ))}
      </ul>

    </div>
  );
}