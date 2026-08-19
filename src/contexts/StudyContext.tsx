'use client'
import { axios_api } from "@/src/api/axios_api";
import { ParsedStudyType } from "@/src/types/ParsedStudyType";
import { MaterialType, StudyType } from "@/src/types/StudyType";
import { createContext, ReactNode, useContext, useState } from "react";

type StudyContextType = {
    studies: StudyType[]
    addStudy: (newParsedStudy: ParsedStudyType) => void;
    handleParsedStudy: (text:string, files: MaterialType[]) => void;
    parsedStudy: ParsedStudyType | null | undefined;
}

export const StudyContext = createContext({} as StudyContextType)

export function StudyContextProvider({ children }: { children: ReactNode }) {

    const [studies, setStudies] = useState<StudyType[]>([])
    const [parsedStudy, setParsedStudy] = useState<ParsedStudyType>();


    async function getStudies() {
        let res = await axios_api.get('/studies')
        setStudies([...studies, res.data])
    }

    async function addStudy(newParsedStudy: ParsedStudyType) {

        let newStudy: StudyType = {
            id: newParsedStudy.id,
            title: newParsedStudy.title,
            date: newParsedStudy.date,
            materials: newParsedStudy.materials,
            color_hex: newParsedStudy.color_hex,
            color_name: newParsedStudy.color_name
        }

        try {
            const resp = await axios_api.post('/studies', newStudy)
            setStudies([...studies, resp.data])
            setParsedStudy(undefined)
        } catch (error) {
            
        }

    
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
        setParsedStudy(resp.data as ParsedStudyType);
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