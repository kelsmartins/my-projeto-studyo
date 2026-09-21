'use client'
import { useEffect, useState } from 'react'
import { useStudyContext } from '@/src/contexts/StudyContext'
import { StudyType } from '@/src/types/StudyType';
import { PdfViewer } from '@/src/components/studysession/PdfViewer';
import { SessionHeader } from '@/src/components/studysession/SessionHeader';
import { MaterialArea } from '@/src/components/studysession/MaterialArea';
import { AnnotationArea } from '@/src/components/studysession/AnnotationArea';
import { SessionMaterials } from '@/src/components/studysession/SessionMaterials';

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

  if (!currentStudy) return null

  return (
    <main className="h-screen flex overflow-hidden flex-col bg-green-200 overflow-hidden">
      <SessionHeader />
      <div className="w-full h-full overflow-hidden bg-red-200 flex overflow-hidden">

        <MaterialArea materials={currentStudy.material}/>
        <AnnotationArea />

      </div>
    </main>
  )
}
