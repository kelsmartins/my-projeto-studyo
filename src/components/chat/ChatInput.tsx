import { Paperclip, Send } from "lucide-react";
import { useState } from "react";

export default function ChatInput() {

    const [text, setText] = useState("");

    return (
        <div className="border rounded-xl p-3 bg-gray-200">
            <textarea
                placeholder="Informe o tema e a data do estudo..."
                rows={2}
                className="w-full resize-none outline-none text-gray-600 text-sm"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <div className="flex justify-between items-center mt-1">

                <label className="flex items-center gap-2 text-[#0033ff] hover:text-gray-800 transition-colors text-xs font-bold">
                    <Paperclip size={14} />
                    Anexar materiais
                    <input type="file" className="hidden" />
                </label>


                <button className="flex items-center gap-2 bg-[#0033ff] text-white rounded-lg px-3 py-2 hover:bg-blue-700 active:bg-gray-800 transition-colors text-xs font-bold">
                    <Send size={14} />
                    Enviar
                </button>
            </div>

        </div>
    );
}