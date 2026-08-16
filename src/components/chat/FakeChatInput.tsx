import { Paperclip, Send } from "lucide-react";

type FakeChatInputProps = {
    handleAddFiles: (newFiles: FileList) => void;
    selectedFiles: File[];
};

export function FakeChatInput({ handleAddFiles, selectedFiles }: FakeChatInputProps) {
    return (
        <div className={`w-full h-10 bg-[#E3DDCE] ${selectedFiles.length > 0 ? 'rounded-b-xl' : 'rounded-xl'} shadow-lg flex`}>
    
            <label className="flex items-center justify-center w-10 h-full">
                <Paperclip size={16} className="text-[#292524]/50"/>
                <input type="file" multiple className="hidden" onChange={(e) => e.target.files && handleAddFiles(e.target.files)} />
            </label>
            <input type="text" className="flex-1 h-full rounded-r-xl px-2 text-[#292524]/70 focus:outline-none text-sm" placeholder="Digite sua mensagem..." />
            <label className="flex items-center justify-center w-10 h-full">
                <Send size={16} className="text-[#292524]/50"/>
                <input type="button" className="hidden" />
            </label>


        </div>
    )
}