import { MaterialType } from "@/src/types/StudyType"

type SessionMaterialsProps={
    materials: MaterialType[];
}

export function SessionMaterials({materials}: SessionMaterialsProps){
    return (
        <ul className="h-[50px] w-full border-b border-gray-300 p-2 flex items-center gap-2">
            {materials?.map((material, index) => (
                <SessionMaterial key={index} material={material} />
            ))}
        </ul>
    )
}

type SessionMaterialProps = {
    material: MaterialType;
}

export function SessionMaterial({material}: SessionMaterialProps){
    return (
        <li className="flex justify-between items-center w-30 h-full bg-red-200 overflow-x-auto p-2 rounded-md">
            <span className="text-xs truncate">{material.name}</span>
        </li>
    )
}