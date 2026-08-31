import { useStudyContext } from "@/src/contexts/StudyContext";
import { File, X } from "lucide-react";

type FilesListProps = {
    material: File[];
};

export function MaterialList({ material }: FilesListProps) {

    const {deleteMaterial} = useStudyContext();

    return (
        <ul className={`w-full h-10 bg-[#faf6ed] p-2 gap-1 ${material.length > 0 ? 'flex rounded-t-xl' : 'hidden'} shadow-lg overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}>
            {material.map((file, index) => (
                <StudySource key={index} file={file} index={index} />

            ))}
        </ul>
    )}

type StudySourceProps = {
    file: File;
    index: number;
}

export default function StudySource({ file, index }:  StudySourceProps) {

    const { deleteCurrentSelectedMaterial } = useStudyContext();
    
        return( 
            <li
                className="bg-[#E3DDCE] text-xs flex gap-2 p-2 w-26 h-full items-center justify-center rounded-md">
                    <File size={26} className="text-black"/>
                    <span className="truncate">{file.name}</span>
                    <button className="bg-[#D3CDBE] rounded-full size-4 flex items-center cursor-pointer"
                    onClick={()=> deleteCurrentSelectedMaterial(index)}>
                        <X w-full h-full className="text-[#292524]/50"/>
                    </button>
            </li>
        )
}