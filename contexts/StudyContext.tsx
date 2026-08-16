import { StudyType } from "@/types/StudyType";
import {createContext, ReactNode, useState } from "react";

type StudyContextType = {
    studies: StudyType[]
    addStudy: (newStudy: StudyType)=> void;
}

export const StudyContext = createContext({} as StudyContextType)

export function StudyContextProvider({children}: {children: ReactNode}){

    const [studies, setStudies] = useState<StudyType[]>([])

    function addStudy(newStudy: StudyType){
        setStudies([...studies, newStudy])
    }

    return (
         <StudyContext.Provider value={{ studies, addStudy }}>
            {children}
        </StudyContext.Provider>
    )
}