'use client'
import { useEffect, useState } from 'react'
import { useStudyContext } from '@/src/contexts/StudyContext'
import { StudyType } from '@/src/types/StudyType';
import { PdfViewer } from '@/src/components/viewers/PdfViewer';

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

  return (
    <div className="w-screen h-screen justify-between bg-green-300 flex justify-between">
      <div className="bg-pink-200 w-[50%] h-full overflow-hidden">
        {/* <PdfViewer materialData={currentStudy?.material} /> */}
      </div>
      <div className="bg-sky-200 w-[50%] h-full">...</div>
    </div>
  )
}
