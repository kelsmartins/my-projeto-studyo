'use client'
import { axios_api } from "@/src/api/axios_api";
import { ParsedStudyType } from "@/src/types/ParsedStudyType";
import { MaterialType, StudyType } from "@/src/types/StudyType";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type StudyContextType = {
    studies: StudyType[];
    doneStudies: StudyType[];

    getStudies: () => void;
    addStudy: (newParsedStudy: ParsedStudyType) => Promise<string>;
    deleteStudy: (id: string) => Promise<string>
    deleteDoneStudies: () => Promise<string>;

    checkDoneStudy: (id: string) => Promise<string>;
    deleteMaterial : (studyId: string, materialId: string) => Promise<string>;

    parseStudy: (text: string, files: File[]) => Promise<void>;
    parsedStudy: ParsedStudyType | null | undefined;
    discardParsedStudy: () => void;

    getCurrentSelectedMaterial: (file: File[]) => void;
    currentSelectedMaterial: File[]
    deleteCurrentSelectedMaterial: (newIndex: number) => void;
}

export const StudyContext = createContext({} as StudyContextType)

export function StudyContextProvider({ children }: { children: ReactNode }) {

    const [studies, setStudies] = useState<StudyType[]>([])
    const [doneStudies, setDoneStudies] = useState<StudyType[]>([])
    const [parsedStudy, setParsedStudy] = useState<ParsedStudyType>();
    const [currentSelectedMaterial, setCurrentSelectedMaterial] = useState<File[]>([]);

    // CRUD BASICO

    async function getStudies() {
        try {
            const res = await axios_api.get('/studies')
            const studiesFromApi = Array.isArray(res.data) ? res.data : [res.data]

            const activeStudies: StudyType[] = []
            const completedStudies: StudyType[] = []

            studiesFromApi.forEach(study => {
                if (study.done === false) {
                    activeStudies.push(study)
                    return
                }

                completedStudies.push(study)
            })

            setStudies(activeStudies)
            setDoneStudies(completedStudies)

        } catch (error) {
            console.error('erro ao buscar estudos:', error)
        }
    }

    useEffect(()=>{
    getStudies()
    }, [])

    async function addStudy(newParsedStudy: ParsedStudyType) {

        const materialsWithIds: MaterialType[] = newParsedStudy.material.map(material => ({
            ...material,
            id: material.id ?? crypto.randomUUID(),
        }))

        const studyId = crypto.randomUUID()

        const newStudy: StudyType = {
            id: studyId,
            title: newParsedStudy.title,
            date: newParsedStudy.date,
            material: materialsWithIds,
            color_hex: newParsedStudy.color_hex,
            color_name: newParsedStudy.color_name,
            done: false
        }

        console.log("DADOS QUE O REACT VAI ENVIAR:", newStudy);

        const formData = new FormData();
        formData.append('study_data', JSON.stringify(newStudy))

        if(currentSelectedMaterial && currentSelectedMaterial.length > 0){
            currentSelectedMaterial.forEach(material => formData.append('files', material))
        }

        try {
            
            const resp = await axios_api.post('/studies', formData)
            setParsedStudy(undefined)
            setCurrentSelectedMaterial([])
            setStudies(currentStudies => [...currentStudies, newStudy])
            return String(resp.data);

        } catch (error) {
            return "erro ao criar estudo. erro:" + error
        }
    }

    async function deleteStudy(id: string){
        const resp = await axios_api.delete(`/studies/${id}`)
        let newStudyList = doneStudies.filter(studies => studies.id !== id)
        setDoneStudies(newStudyList);

        return resp.data;
    }


    async function checkDoneStudy(id: string){
        try {
            const resp = await axios_api.put(`/studies/${id}`)
            const checkedDoneStudy = studies.find(study => study.id === id)

            if (checkedDoneStudy) {
                setStudies(currentStudies => currentStudies.filter(study => study.id !== id))
                setDoneStudies(currentDoneStudies => [...currentDoneStudies, { ...checkedDoneStudy, done: true }])
            }

            getStudies();
            return resp.data

        } catch (error) {
            return "erro ao concluir estudo: " + error 
        }
    }

    async function deleteMaterial(studyId: string, materialId: string){
        try {
            const  resp = await axios_api.delete(`/studies/${studyId}/material/${materialId}`)

            setStudies(studies.map(study => (
                study.id === studyId ? 
                    {...study, material: study.material.filter(material => material.id !== materialId) }
                    : study
                )
            ))
            
            getStudies();
            console.log("material deletado com sucesso:", resp.data)
            return String(resp.data)

        } catch (error) {
            return "falha ao deletar material: " + error
        }
    }

    async function deleteDoneStudies(){
        try {
            const resp = await axios_api.delete('/studies/done-studies')
            setDoneStudies([])
            return String(resp.data)
        }
        catch (error) {
            return "erro ao deletar estudos concluídos: " + error
        }
    }



    // GERAR ESTUDO

    async function parseStudy(text: string, files: File[]) {

        // coletar nomes
        const fileNames = files.map(file => file.name)

        // criar pacote a ser enviado
        const payload = {
            content: text,
            fileNames: fileNames
        }

        const resp = await axios_api.post('/parse_study', payload)
        console.log("Resposta do backend:", resp.data);
        const responseData = resp.data;
        const parsedStudyData = typeof responseData === "string"
            ? JSON.parse(responseData) as ParsedStudyType & { materials?: MaterialType[] }
            : responseData as ParsedStudyType & { materials?: MaterialType[] };

        setParsedStudy({
            ...parsedStudyData,
            material: parsedStudyData.material ?? parsedStudyData.materials ?? [],
        });
    }

    function discardParsedStudy(){
        setParsedStudy(undefined)
    }

    
    function getCurrentSelectedMaterial(filelist: File[]){
        setCurrentSelectedMaterial(prev => [...prev, ...filelist])
    }

    function deleteCurrentSelectedMaterial(newIndex: number){
        setCurrentSelectedMaterial(currentSelectedMaterial.filter((_, index) => index !== newIndex))
    }

    return (
        <StudyContext.Provider value={{ studies, doneStudies, getStudies, addStudy, deleteStudy, deleteDoneStudies, checkDoneStudy, deleteMaterial, parseStudy, parsedStudy, discardParsedStudy, getCurrentSelectedMaterial, currentSelectedMaterial, deleteCurrentSelectedMaterial }}>
            {children}
        </StudyContext.Provider>
    )
}

export function useStudyContext() {
    const context = useContext(StudyContext)
    return context
}