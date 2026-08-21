import { MaterialType } from "@/src/types/StudyType";
import { File, Link } from "lucide-react";

type FilesListProps = {
    material: MaterialType[];
};

export function FilesList({ material }: FilesListProps) {
    return (
        <ul className={`w-full h-10 bg-[#E3DDCE] p-2 gap-1 ${material.length > 0 ? 'flex rounded-t-xl' : 'hidden'} shadow-lg overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}>
            {material.map((file, index) => (
                <StudySource key={index} material={file} />

            ))}
        </ul>
    )}


export default function StudySource({ material }: { material: MaterialType }) {
    
    if (material.type === 'file') {
        return (
            <li>
                <a href={material.url} target="_blank" rel="noopener noreferrer">
                    <File size={16}/>
                    {material.name}
                </a>
            </li>
        )
    }

    if (material.type === 'link') {
        return (
            <li>
                <a href={material.name} target="_blank" rel="noopener noreferrer">
                    <Link size={16}/>
                    {material.name}
                </a>
            </li>
        )
    }

    return null;
}