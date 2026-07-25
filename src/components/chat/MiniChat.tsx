import { useState } from "react";
import ChatInput from "./ChatInput";
import { ChatList } from "./ChatList";

export function MiniChat() {

    const [messages, setMessages] = useState([]);

    return (
        <div className="h-[400px] w-[300px] bg-white p-3 rounded-lg flex justify-between flex-col">
            <ChatList />
            <ChatInput />
        </div>
    )
}