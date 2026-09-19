import { useStudyContext } from "@/src/contexts/StudyContext";
import { File, X } from "lucide-react";

type FilesListProps = {
    material: File[];
};

export function MaterialList({ material }: FilesListProps) {

    return (
        <ul className={`w-full h-10 bg-[#F9FBFC] p-2 gap-1 ${material.length > 0 ? 'flex rounded-t-xl' : 'hidden'} shadow-lg border border-[#292524]/15 border-b-none overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}>
            {material.map((file, index) => (
                <MaterialItem key={index} file={file} index={index} />

            ))}
        </ul>
    )}

type MaterialItemProps = {
    file: File;
    index: number;
}

export default function MaterialItem({ file, index }:  MaterialItemProps) {

    const { deleteCurrentSelectedMaterial } = useStudyContext();
    
        return( 
            <li
                className="bg-[#FFFFFE] text-xs flex gap-2 p-2 w-26 h-full items-center justify-center rounded-md">
                    <File size={26} className="text-black"/>
                    <span className="truncate">{file.name}</span>
                    <button className="bg-transparent rounded-full size-4 flex items-center cursor-pointer"
                    onClick={()=> deleteCurrentSelectedMaterial(index)}>
                        <X className="w-full h-full size-full text-[#292524]/50"/>
                    </button>
            </li>
        )
}