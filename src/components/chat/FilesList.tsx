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
        <li className="flex items-center justify-center w-10 h-full px-3 py-2 bg-red-200 rounded-xl w-20">
            <span className="text-[#292524]/70 text-xs truncate">{file.name}</span>
        </li>
    )
}