'use client'
import { axios_api } from "@/src/api/axios_api";
import { MaterialType, StudyType } from "@/types/StudyType";
import { UUID } from "crypto";
import { FreshnessPolicy } from "next/dist/client/components/router-reducer/ppr-navigations";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type StudyContextType = {
    studies: StudyType[]
    addStudy: (newStudy: StudyType) => void;
    handleParsedStudy: (text:string, files: MaterialType[]) => void;
    parsedStudy: StudyType | null | undefined;
}

export const StudyContext = createContext({} as StudyContextType)

export function StudyContextProvider({ children }: { children: ReactNode }) {

    const [studies, setStudies] = useState<StudyType[]>([])
    const [parsedStudy, setParsedStudy] = useState<StudyType | null>();


    async function getStudies() {
        let res = await axios_api.get('/api/studies')
        setStudies([...studies, res.data])
    }

    function addStudy(newStudy: StudyType) {
        setStudies([...studies, newStudy])
    }

    async function handleParsedStudy(text:string, files: MaterialType[]) {

        let formdata = new FormData();

        formdata.append('text', text)

        files.forEach((file, index)=>{
           if (file instanceof File) {
            formdata.append(`file_${index}`, file);
  }
        })

        let resp = await axios_api.post('/parse_study', formdata)
        setParsedStudy(resp.data as StudyType);
    }

    return (
        <StudyContext.Provider value={{ studies, addStudy, handleParsedStudy, parsedStudy }}>
            {children}
        </StudyContext.Provider>
    )
}

export function useStudyContext(){
    let context = useContext(StudyContext)
    return context
}