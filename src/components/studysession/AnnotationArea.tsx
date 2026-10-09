import { Plus } from "lucide-react";

export function AnnotationArea() {
    return (
        <aside className="flex-1 overflow-auto p-4 bg-gray-200 overflow-hidden">

            <div className="bg-white h-full p-4 rounded-md overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold text-black/70 flex items-center justify-center bg-red-200">Anotações</h2>
                    <button className="bg-black/60 rounded-lg text-xs flex gap-1 px-2 py-1 text-white items-center justify-center hover:bg-black/80 transition-colors">
                        <Plus className="size-3" />
                        anotação
                    </button>
                </div>

                <textarea
                    className="w-full h-25 p-4 text-sm border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your annotations here..."
                />

                <ul className="mt-2 bg-red-200 h-full w-full">
                    
                </ul>

            </div>

        </aside>
    )
}