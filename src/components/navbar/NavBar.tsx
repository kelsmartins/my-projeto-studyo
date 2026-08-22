'use client';
import Link from "next/link";

export default function NavBar() {

    const pages = [
        { name: "today", href: "/" },
        { name: "board", href: "/board" },
    ];

    return (
        <nav className="bg-[#292524] p-4 w-[200px]">
            <ul className="space-y-2 p-4">
                {pages.map((page) => (
                    <li key={page.href}>
                        <Link href={page.href} className="text-white text-sm hover:text-gray-300">
                            {page.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}