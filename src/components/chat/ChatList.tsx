import { Message } from "./Message";


export function ChatList() {
    return (
        <div className="flex-1 overflow-y-auto">
            <Message />
        </div>
    )
}