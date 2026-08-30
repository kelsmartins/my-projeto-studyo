'use client';
import Link from "next/link";

export default function NavBar() {

    const pages = [
        { name: "Hoje", href: "/" },
        { name: "Mural", href: "/board" },
    ];

    return (
        <nav className="p-4 w-[150px] border-r border-[#292524]/15">
            <ul className="space-y-2 p-4">
                {pages.map((page) => (
                    <li key={page.href}>
                        <Link href={page.href} className="text-[#292524] text-sm hover:text-gray-300">
                            {page.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}