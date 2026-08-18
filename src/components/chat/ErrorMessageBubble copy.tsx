import { ParsedStudyType } from "@/types/ParsedStudyType";

type ErrorMessageBubbleProps = {
  studyData: ParsedStudyType | null | undefined;
}

export function ErrorMessageBubble({ studyData }: ErrorMessageBubbleProps) {
  return (
    <div
      className="bg-[#E3DDCE] p-4 rounded-xl max-w-[400px] shadow-sm">

      <p className="text-sm text-[#292524]">
        {studyData?.message}
      </p>

    </div>
  );
}