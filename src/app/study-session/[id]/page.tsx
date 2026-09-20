'use client'
import { useEffect } from 'react'
import { MaterialViewer } from "./MaterialViewer"
import { } from ''

interface StudySessionProps {
  params: Promise<{ id: string }>;
}

export function StudySession({ params }: StudySessionProps) {

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

      <MaterialViewer />
      <div className="bg-purple-400 w-[50%] h-full">...</div>

    </div>
  )
}