import { File } from "lucide-react";

type FilesListProps = {
    selectedFiles: File[];
};

export function FilesList({ selectedFiles }: FilesListProps) {
    return (
        <ul className={`w-full h-10 bg-[#E3DDCE] p-2 gap-1 ${selectedFiles.length > 0 ? 'flex rounded-t-xl' : 'hidden'} shadow-lg overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}>
            {selectedFiles.map((file, index) => (

                <FileItem key={index} file={file} />

            ))}
        </ul>
    )}


export function FileItem({ file }: { file: File }) {
    return (
        <li className="flex w-22 h-full px-2 py-2 bg-[#292524]/40 rounded-xl w-20 flex items-center justify-between gap-1">
            <File size={13} className="text-[#000]/60 size-24"/>
            <span className="text-[#000]/70 font-bold text-xs truncate">{file.name}</span>
        </li>
    )
}