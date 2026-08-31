
import { X } from "lucide-react";
import { FakeChatInput } from "./FakeChatInput";
import { MaterialList } from "./MaterialList";
import { useState } from "react";
import { useStudyContext } from "@/src/contexts/StudyContext";
import { MessageBubble } from "./MessageBubble";
import { ErrorMessageBubble } from "./ErrorMessageBubble";

type FakeChatProps = {
    handleShowFakeChat: () => void;
}

export function FakeChat({ handleShowFakeChat }: FakeChatProps) {

    const { getCurrentSelectedMaterial, currentSelectedMaterial } = useStudyContext();

    const [message, setMessage] = useState("");

    const { parsedStudy, parseStudy } = useStudyContext();


    function handleAddFiles(newFiles: FileList) {
        const files = [...Array.from(newFiles)];
        getCurrentSelectedMaterial(files);
    }

    function handleParse() {
        if (message.trim() != '') {
            parseStudy(message, currentSelectedMaterial)
        }
    }


    return (
        <div className="w-screen h-screen bg-black/20 absolute top-0 left-0 flex justify-center items-center"
        onClick={handleShowFakeChat}>

            <div className=" w-100 max-h-100 bg-[#F0ECE2] flex flex-col items-center justify-between p-1 rounded-md fixed top-12 right-6" 
            onClick={e => e.stopPropagation()}>

                <div className="w-full h-5 flex items-center justify-end mb-2">
                    <button
                        onClick={handleShowFakeChat}>
                        <X className="text-[#292524]/50" size={20} />
                    </button>
                </div>

                <span className="text-[#292524]/60 italic w-100 text-xs mb-5 text-center">Informe o assunto, os materiais(links/arquivos), a data e uma cor :D</span>

                <div className="w-96 max-h-80 flex flex-col p-2 mb-0.5">
                    <ul className="flex-1 flex items-center justify-center mb-5">

                        {parsedStudy != undefined && parsedStudy.message == null && parsedStudy != undefined && <MessageBubble studyData={parsedStudy} handleHideFakeChat={handleShowFakeChat}/>}
                        {parsedStudy?.message && <ErrorMessageBubble studyData={parsedStudy} />}

                    </ul>

                    <MaterialList material={currentSelectedMaterial} />
                    <FakeChatInput handleAddFiles={handleAddFiles} selectedFiles={currentSelectedMaterial} setMessage={setMessage} handleParse={handleParse} />

                </div>

            </div>

        </div>
    )
}