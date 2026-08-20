
import { X } from "lucide-react";
import { FakeChatInput } from "./FakeChatInput";
import { FilesList } from "./FilesList";
import { useState } from "react";
import { useStudyContext } from "@/src/contexts/StudyContext";
import { MessageBubble } from "./MessageBubble";
import { ErrorMessageBubble } from "./ErrorMessageBubble";

type FakeChatProps = {
    handleShowFakeChat: ()=> void;
}

export function FakeChat({handleShowFakeChat} : FakeChatProps) {

    const [message, setMessage] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const {parsedStudy} = useStudyContext();

    const {handleParsedStudy} = useStudyContext();

    function handleAddFiles(newFiles: FileList) {
        for (let i = 0; i < newFiles.length; i++) {
            const newFile = newFiles[i];
            setSelectedFiles([...selectedFiles, newFile]);
        }
    }

    function handleParse(){
        if(message.trim() != ''){
            handleParsedStudy(message, selectedFiles)
        }
    }



    return (
        <div className="w-screen h-screen bg-[#D3CDBE] absolute top-0 left-0 flex flex-col justify-center items-center">

            <div className="w-full h-10 bg-[#292524] fixed top-0">
                <button
                onClick={handleShowFakeChat}>
                    <X className="text-white absolute top-2 right-2" size={20} />
                </button>
            </div>

            <span className="text-[#292524]/60 italic w-100 text-xs mb-5 text-center">Informe o assunto, os materiais(links/arquivos), a data e uma cor :D</span>

            <div className="w-100 max-h-80 flex flex-col">
                <ul className="flex-1 flex items-center justify-center mb-5">
    
                    {parsedStudy != undefined && parsedStudy.message == null && <MessageBubble studyData={parsedStudy}/> } 
                    {parsedStudy?.message && <ErrorMessageBubble studyData={parsedStudy}/>}
            
                </ul>

                <FilesList  selectedFiles={selectedFiles} />
                <FakeChatInput handleAddFiles={handleAddFiles} selectedFiles={selectedFiles} setMessage={setMessage} handleParse={handleParse} />

            </div>  
        </div>
    )
}