import { UUID } from "crypto";

export interface StudyType {
    id: UUID,
    title: string,
    date: Date,
    links?: string[],
    files?: File[]
    
}