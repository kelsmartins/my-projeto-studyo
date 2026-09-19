'use client';
import { FakeChat } from "@/src/components/chat/FakeChat";
import { PageHeader } from "@/src/components/pages/PageHeader";
import { StudyItem } from "@/src/components/studycard/StudyItem";
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
    <div className="flex-1 min-h-[calc(100vh-60px)]">
      
      <PageHeader  title="Mural de Cards" subtitle="Seu espaço de estudos" buttonElement={<PlusCircle size={16} />} buttonText="Novo estudo" handleShow={handleShowFakeChat} state={showFakeChat} elementToShow={<FakeChat handleShowFakeChat={handleShowFakeChat} />} theresButton={true} />

      <ul className="flex-1 flex flex-col gap-3">
        {studies.map((study, index) => (
          <StudyItem key={index} studyData={study} />
        ))}
      </ul>

    </div>
  );
}