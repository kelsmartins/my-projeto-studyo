export function StudyCard(){
    return (
        <div className="w-70 h-40 bg-[#ff000013] flex justify-between rounded-xl shadow-lg">

            <div className="w-4 h-full bg-[#ff0000] rounded-l-xl"></div>

            <div className="flex flex-col justify-between p-4">

                <div className="w-full h-full flex flex-col">
                    <h2 className="text-[#292524] font-bold mb-1 text-md max-h-12 overflow-hidden">Study Card I dont know what am I doing but I think I am doing it wrong</h2>
                    <h3 className="text-[#ff0000] text-xs font-bold">12/07/2004</h3>
                </div>

                <div className="w-full h-10 flex items-center justify-between text-xs text-[#292524]">
                    <span className="font-bold hover:underline hover:cursor-pointer">ver mais</span>
                    <button className="px-3 py-2 bg-[#ff0000] rounded-lg font-semibold text-white">concluir</button>
                </div>

            </div>
        
        </div>
    )
}