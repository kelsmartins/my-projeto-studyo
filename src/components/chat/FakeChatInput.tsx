import { MaterialType } from "@/src/types/StudyType";
import { Paperclip, Send } from "lucide-react";

type FakeChatInputProps = {
    handleAddFiles: (newFiles: FileList) => void;
    selectedFiles: File[];
    setMessage: (text: string) => void;
    handleParse: () => void;
};

export function FakeChatInput({ handleAddFiles, selectedFiles, setMessage, handleParse }: FakeChatInputProps) {
    return (
        <div className={`w-full h-10 bg-[#E3DDCE] ${selectedFiles.length > 0 ? 'rounded-b-xl' : 'rounded-xl'} shadow-lg flex`}>
    
            <label className="flex items-center justify-center w-10 h-full">
                <Paperclip size={16} className="text-[#292524]/50"/>
                <input type="file" multiple className="hidden" onChange={(e) => e.target.files && handleAddFiles(e.target.files)} />
            </label>

            <input 
            type="text" 
            className="flex-1 h-full rounded-r-xl px-2 text-[#292524]/70 focus:outline-none text-sm" 
            placeholder="Digite sua mensagem..." 
            onChange={e => setMessage(e.target.value)}
            />
            
            <button 
            className="flex items-center justify-center w-10 h-full"
            onClick={handleParse}>
                <Send size={16} className="text-[#292524]/50"/>
            </button>


        </div>
    )
}