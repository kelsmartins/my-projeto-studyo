import { ParsedStudyType } from "@/src/types/ParsedStudyType";

type ErrorMessageBubbleProps = {
  studyData: ParsedStudyType | null | undefined;
}

export function ErrorMessageBubble({ studyData }: ErrorMessageBubbleProps) {
  return (
    <div
      className="bg-[#F9FBFC] p-4 rounded-xl mb-2 max-w-[400px] shadow-sm flex flex-col">

      <p className="text-sm text-[#292524]">
        {studyData?.message}
      </p>

    </div>
  );
}