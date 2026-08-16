'use client'
import { FakeChat } from "../components/chat/FakeChat";


export default function Home() {
  return (
    <div className="flex min-h-screen p-4 bg-[#D9D4C6]">
      <FakeChat />
    </div>
  );
}
