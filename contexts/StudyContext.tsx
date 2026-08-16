'use client'
import { axios_api } from "@/src/api/axios_api";
import { StudyType } from "@/types/StudyType";
import {createContext, ReactNode, useEffect, useState } from "react";

type StudyContextType = {
    studies: StudyType[]
    addStudy: (newStudy: StudyType)=> void;
}

export const StudyContext = createContext({} as StudyContextType)

export function StudyContextProvider({children}: {children: ReactNode}){

    const [studies, setStudies] = useState<StudyType[]>([])

    async function getStudies(){
        let res = await axios_api.get('/studies')
        setStudies([...studies, res.data])
    }

    function addStudy(newStudy: StudyType){
        setStudies([...studies, newStudy])
    }

    return (
         <StudyContext.Provider value={{ studies, addStudy }}>
            {children}
        </StudyContext.Provider>
    )
}