import { Paperclip, Send } from "lucide-react";

export function FakeChatInput() {
    return (
        <div className="w-full h-9 bg-[#F5F0E6] rounded-xl shadow-inner flex">
    
            <label className="flex items-center justify-center w-10 h-full">
                <Paperclip size={16} className="text-[#292524]/50"/>
                <input type="file" multiple className="hidden" />
            </label>
            <input type="text" className="flex-1 h-full rounded-r-xl px-2 text-[#292524]/70 focus:outline-none text-sm" placeholder="Digite sua mensagem..." />
            <label className="flex items-center justify-center w-10 h-full">
                <Send size={16} className="text-[#292524]/50"/>
                <input type="button" className="hidden" />
            </label>


        </div>
    )
}