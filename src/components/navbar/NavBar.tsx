'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Check, Clock3, LayoutGrid } from "lucide-react";

export default function NavBar() {
    const pathname = usePathname();

    const pages = [
        { name: "Hoje", href: "/", icon: Clock3 },
        { name: "Mural", href: "/board", icon: LayoutGrid },
        { name: "Calendário", href: "/calendar", icon: CalendarDays },
        { name: "Concluídos", href: "/done-studies", icon: Check }
    ];

    return (
        <nav className="min-h-screen w-[200px] shrink-0 border-r border-slate-200 bg-gradient-to-b from-slate-100 via-blue-50/40 to-slate-200/70 p-5 text-stone-800 shadow-[0_0_18px_rgba(147,197,253,0.16)]">
            <div className="mb-10 px-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Studyo</p>
                <h1 className="mt-2 text-xl font-bold tracking-tight text-stone-900">Seu espaço</h1>
            </div>
            <ul className="space-y-2">
                {pages.map((page) => (
                    <li key={page.href}>
                        <Link
                            href={page.href}
                            className={`group flex items-center gap-3 rounded-lg px-3 py-3 text-xs font-medium transition-colors ${
                                pathname === page.href
                                    ? "bg-stone-200 text-stone-900"
                                    : "text-stone-600 hover:bg-stone-200/60 hover:text-stone-900"
                            }`}
                        >
                            <span className={`$ {
                                pathname === page.href ? "text-stone-900" : "text-stone-500"
                            }`} aria-hidden="true">
                                <page.icon size={16} strokeWidth={2} />
                            </span>
                            <span>{page.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
