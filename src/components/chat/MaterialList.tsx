import { useStudyContext } from "@/src/contexts/StudyContext";
import { File, X } from "lucide-react";

type FilesListProps = {
    material: File[];
};

export function MaterialList({ material }: FilesListProps) {

    const {deleteMaterial} = useStudyContext();

    return (
        <ul className={`w-full h-10 bg-[#E3DDCE] p-2 gap-1 ${material.length > 0 ? 'flex rounded-t-xl' : 'hidden'} shadow-lg overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}>
            {material.map((file, index) => (
                <StudySource key={index} file={file} onClick={deleteMaterial} />

            ))}
        </ul>
    )}

type StudySourceProps = {
    file: File;
    onClick: ()=> void; 
}

export default function StudySource({ file, onClick }:  StudySourceProps) {
    
        return( 
            <li
                className="bg-[#C8C2B3] text-xs flex gap-2 p-2 w-26 h-full items-center justify-center rounded-md">
                    <File size={24} className="text-black"/>
                    <span className="truncate">{file.name}</span>
                    <button className="bg-[#AFA99A] rounded-full size-4 flex items-center cursor-pointer"
                    onClick={deleteM}>
                        <X w-full h-full className="text-[#292524]/70"/>
                    </button>
            </li>
        )
}