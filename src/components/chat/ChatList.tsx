import { InstructionMessage } from "./InstructionMessage";


export function ChatList({ messages }: { messages: string[] }) {
    return (
        <div className="flex-1 overflow-y-auto">
            {messages.length === 0 && (
                <InstructionMessage />
            )}
        </div>
    )
}