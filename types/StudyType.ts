import { UUID } from "crypto";

export interface MaterialType {
    type: string | File;
    name: string
}

export interface StudyType {
    id: UUID,
    title: string,
    date: Date,
    materials: MaterialType[]
    color_name: string;  
    color_hex: string; 
    
}
