'use client'
import { useEffect, useState } from 'react'
import { useStudyContext } from '@/src/contexts/StudyContext'
import { StudyType } from '@/src/types/StudyType';
import { PdfViewer } from '@/src/components/studysession/PdfViewer';
import { SessionHeader } from '@/src/components/studysession/SessionHeader';
import { MaterialArea } from '@/src/components/studysession/MaterialArea';
import { AnnotationArea } from '@/src/components/studysession/AnnotationArea';

interface StudySessionProps {
  params: Promise<{ id: string }>;
}

export default function StudySession({ params }: StudySessionProps) {
  const { getStudyById } = useStudyContext();
  const [currentStudy, setCurrentStudy] = useState<StudyType | null>(null)

  useEffect(() => {
    async function loadStudy() {
      const { id } = await params
      const foundStudy = await getStudyById(id)

      if (foundStudy) {
        setCurrentStudy(foundStudy)
      } else {
        window.alert('Estudo não encontrado')
      }
    }

    loadStudy()
  }, [params, getStudyById])

  if(!currentStudy) return null

  return (
    <div className=" w-screen h-screen justify-between bg-green-300 flex flex-col">
      <SessionHeader />
      {/* <MaterialArea materials={currentStudy?.material}/>
      <AnnotationArea />
       */}
       <div className="flex-1 h-full bg-red-200 overflow-hidden">
          <MaterialArea materials={currentStudy?.material}/>
          <AnnotationArea />
       </div>
    </div>
  )
}
