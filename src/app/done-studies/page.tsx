'use client';
import { PageHeader } from "@/src/components/pages/PageHeader";
import { StudyCard } from "@/src/components/studycard/StudyCard";
import { useStudyContext } from "@/src/contexts/StudyContext";
import { Trash2Icon, X } from "lucide-react";
import { useState } from "react";


export default function DoneStudies() {

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { doneStudies, deleteDoneStudies } = useStudyContext()


    return (
        <div className="flex flex-col min-h-screen">

            <PageHeader  title="Estudos concluídos" subtitle="Recupere ou delete estudos concluídos" buttonElement={<Trash2Icon size={16} className="font-bold text-red-500" />} buttonText="Excluir todos" buttonTextColor="text-red-500" handleShow={showDeleteModal ? () => setShowDeleteModal(false) : () => setShowDeleteModal(true)} state={showDeleteModal} elementToShow={<DeleteModal onConfirm={deleteDoneStudies} onCancel={() => setShowDeleteModal(false)} />} />

            <ul className="flex p-4">
                {doneStudies.map((study, index) => (
                    <StudyCard key={index} studyData={study} />
                ))}
            </ul>

        </div>
    );
}

type deleteModalProps = {
    onConfirm: () => void;
    onCancel: () => void;
}

export function DeleteModal({ onConfirm, onCancel }: deleteModalProps) {

    return (
        <div
            className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-[#292524]/20 px-4"
        onClick={onCancel}>
            <div className="w-full max-w-sm overflow-hidden rounded-xl border border-[#E7E1D5] bg-[#F9FBFC] shadow-2xl"
                onClick={(e) => e.stopPropagation()}>

                <header className="relative mb-1 flex w-full flex-col items-center justify-center border-b border-[#292524]/10 px-8 pb-3 pt-2">
                    <h2 className="text-sm font-semibold tracking-wide text-[#292524]">
                        Confirmar exclusão
                    </h2>
                    <button
                        className="absolute right-2 top-2 rounded-full p-1 transition-colors hover:bg-[#292524]/10"
                        onClick={onCancel}
                    >
                        <X className="size-5 text-[#292524]/50 transition-colors hover:text-[#292524]" />
                    </button>
                </header>
                <div className="p-2 sm:p-4">
                    <div className="mb-3 flex items-center">
                        <p className=" text-xs leading-5 text-[#6B6258]">
                            Tem certeza de que deseja excluir todos os estudos concluídos? Esta ação não pode ser desfeita.
                        </p>
                    </div>
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <button
                            className="rounded-lg border border-[#D8D0C2] px-4 py-2 text-xs font-semibold text-[#5C554D] transition hover:bg-[#F1ECE2]"
                            onClick={onCancel}
                        >
                            Cancelar
                        </button>
                        <button
                            className="rounded-lg bg-[#292524] px-4 py-2 text-xs font-semibold shadow-sm transition hover:bg-red-700  text-red-600 hover:text-[#292524]"
                            onClick={onConfirm}
                        >
                            Excluir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}




