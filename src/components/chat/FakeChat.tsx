import { FakeChatInput } from "./FakeChatInput";

export function FakeChat() {

    return (
        <div className="w-screen h-screen bg-[#D9D4C6] absolute top-0 left-0 flex flex-col justify-center items-center">

            <span className="text-[#292524]/60 italic w-100 text-xs mb-5 text-center">Informe o assunto, os materiais(links/arquivos), a data e uma cor :D</span>

            <div className="w-100 min-h-120 flex flex-col">
                <div>

                </div>

                <FakeChatInput />

            </div>  
        </div>
    )
}