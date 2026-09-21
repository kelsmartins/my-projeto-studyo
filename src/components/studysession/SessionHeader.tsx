import { ArrowLeft, ChevronLeft } from "lucide-react";
import Link from "next/link";

type SessionHeaderProps={
    title: string;
}

export function SessionHeader({title}: SessionHeaderProps){
    return (
        <header className="w-full h-[60px] flex items-center justify-start p-4 gap-4">

            <Link 
                className="flex flex items-center gap-1"
                href='/'>
                    <ArrowLeft className="text-[#292524]/70 size-4 font-bold" />
                    <span className="text-[#292524]/70 font-bold text-sm">Voltar</span>
            </Link>

            <span className="w-[1.5px] h-[50%] bg-[#292524]/50"></span>

            <h2 
                className="text-[#292524]/70 font-bold text-sm">
                    {title}
            </h2>

        </header>
    )
}