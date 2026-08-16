
import { X } from "lucide-react";
import { FakeChatInput } from "./FakeChatInput";
import { FilesList } from "./FilesList";
import { useState } from "react";

export function FakeChat() {

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    function handleAddFiles(newFiles: FileList) {
        for (let i = 0; i < newFiles.length; i++) {
            const newFile = newFiles[i];
            setSelectedFiles([...selectedFiles, newFile]);
        }
    }

    return (
        <div className="w-screen h-screen bg-[#D3CDBE] absolute top-0 left-0 flex flex-col justify-center items-center">

            <div className="w-full h-10 bg-[#292524] fixed top-0">
                <button>
                    <X className="text-white absolute top-2 right-2" size={20} />
                </button>
            </div>

            <span className="text-[#292524]/60 italic w-100 text-xs mb-5 text-center">Informe o assunto, os materiais(links/arquivos), a data e uma cor :D</span>

            <div className="w-100 max-h-80 flex flex-col">
                <ul className="flex-1 flex items-center justify-center mb-5">



                </ul>

                <FilesList  selectedFiles={selectedFiles} />
                <FakeChatInput handleAddFiles={handleAddFiles} selectedFiles={selectedFiles} />

            </div>  
        </div>
    )
}