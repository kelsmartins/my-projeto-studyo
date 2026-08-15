'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const pathname = usePathname();

    const pages = [
        { name: "today", href: "/" },
        { name: "board", href: "/board" },
    ];

    return (
        <nav className="bg-[#292524] p-4 w-[200px]">
            <ul className="space-y-2">
                {pages.map((page) => (
                    <li key={page.href}>
                        <Link href={page.href} className="text-white hover:text-gray-300">
                            {page.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}