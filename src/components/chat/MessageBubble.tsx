import { StudyType } from "@/types/StudyType";

type MessageBubbleProps = {
    studyData: StudyType | null | undefined;
}

export function MessageBubble({ studyData }: MessageBubbleProps) {
  return (
    <div
      style={{
        backgroundColor: studyData?.color,
        padding: "1rem",
        borderRadius: "12px",
        marginBottom: "1rem",
        maxWidth: "400px",
        color: "#1c1c1c"
      }}
    >
      <h4 style={{ margin: 0 }}>{studyData?.title}</h4>
      <p style={{ margin: "0.5rem 0" }}>{studyData?.date instanceof Date ? studyData.date.toLocaleDateString() : studyData?.date}</p>

      {studyData?.materials && studyData.materials.length > 0 && (
        <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
          {studyData.materials.map((m, i) => (
            <li key={i}>
              {m.type === "file" ? "📄 Arquivo:" : "🔗 Link:"} {m.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}