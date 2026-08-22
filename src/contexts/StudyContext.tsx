'use client'
import { axios_api } from "@/src/api/axios_api";
import { ParsedStudyType } from "@/src/types/ParsedStudyType";
import { MaterialType, StudyType } from "@/src/types/StudyType";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type StudyContextType = {
    studies: StudyType[]
    getStudies: () => void;
    getCurrentSelectedMaterial: (file: File[]) => void;
    addStudy: (newParsedStudy: ParsedStudyType) => void;
    handleParsedStudy: (text: string, files: File[]) => void;
    parsedStudy: ParsedStudyType | null | undefined;
    discardParsedStudy: () => void;
}

export const StudyContext = createContext({} as StudyContextType)

export function StudyContextProvider({ children }: { children: ReactNode }) {

    const [studies, setStudies] = useState<StudyType[]>([])
    const [parsedStudy, setParsedStudy] = useState<ParsedStudyType>();
    const [currentSelectedMaterial, setCurrentSelectedMaterial] = useState<File[]>([]);

    function getCurrentSelectedMaterial(filelist: File[]){
        setCurrentSelectedMaterial(filelist)
    }

    async function getStudies() {
        const res = await axios_api.get('/studies')
        const studiesFromApi = Array.isArray(res.data) ? res.data : [res.data]
        setStudies(studiesFromApi)
    }

    useEffect(()=>{
    getStudies()
    }, [])

    async function addStudy(newParsedStudy: ParsedStudyType) {

        const newStudy: StudyType = {
            id: newParsedStudy.id,
            title: newParsedStudy.title,
            date: newParsedStudy.date,
            material: newParsedStudy.material,
            color_hex: newParsedStudy.color_hex,
            color_name: newParsedStudy.color_name
        }

        console.log("DADOS QUE O REACT VAI ENVIAR:", newStudy);

        const formData = new FormData();
        formData.append('study_data', JSON.stringify(newStudy))

        if(currentSelectedMaterial && currentSelectedMaterial.length > 0){
            currentSelectedMaterial.forEach(material => formData.append('files', material))
        }

        try {
            
            const resp = await axios_api.post('/studies', formData)
            setStudies(currentStudies => [...currentStudies, resp.data])
            setParsedStudy(undefined)
            setCurrentSelectedMaterial([])
            

        } catch (error) {
            return "falha ao criar estudo. erro:" + error
        }


    }

    async function handleParsedStudy(text: string, files: File[]) {

        // coletar nomes
        const fileNames = files.map(file => file.name)

        // criar pacote a ser enviado
        const payload = {
            text: text,
            fileNames: fileNames
        }

        const resp = await axios_api.post('/parse_study', payload)
        const parsedStudyData = resp.data as ParsedStudyType & { materials?: MaterialType[] };

        setParsedStudy({
            ...parsedStudyData,
            material: parsedStudyData.material ?? parsedStudyData.materials ?? [],
        });
    }

    function discardParsedStudy(){
        setParsedStudy(undefined)
    }

    return (
        <StudyContext.Provider value={{ studies, getStudies, getCurrentSelectedMaterial, addStudy, handleParsedStudy, parsedStudy, discardParsedStudy }}>
            {children}
        </StudyContext.Provider>
    )
}

export function useStudyContext() {
    const context = useContext(StudyContext)
    return context
}