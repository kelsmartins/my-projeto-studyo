import { MaterialType } from "@/src/types/StudyType";

type MaterialViewerProps = {
    materialData: MaterialType;
};
export function MaterialViewer({ materialData }: MaterialViewerProps) {
    return (
        <iframe src={materialData.url} title={materialData.name} className="w-full h-full" />
    )
}