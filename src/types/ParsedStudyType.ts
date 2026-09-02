import { StudyType } from "./StudyType";

export interface ParsedStudyType extends StudyType{
    message: string | null;
}