"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Navigation() {
    const pathname = usePathname();

    const navItems = [
        { href: "/", label: "Home", icon: "🏠" },
        { href: "/autocomplete", label: "autocomplete", icon: "✍️" },
    ];

    return (
        <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/"
                            className="flex items-center space-x-3 group"
                        >
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                                <span className="text-white font-bold text-sm">
                                    V
                                </span>
                            </div>
                            <div className="hidden sm:block">
                                <div className="font-bold text-lg bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                                    Interview Prep
                                </div>
                                <div className="text-xs text-muted-foreground -mt-1">
                                    Next.js Full-Stack
                                </div>
                            </div>
                        </Link>

                        <Badge
                            variant="secondary"
                            className="hidden md:inline-flex text-xs"
                        >
                            Ready for Vercel
                        </Badge>
                    </div>

                    <div className="flex items-center space-x-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Button
                                    key={item.href}
                                    variant={isActive ? "default" : "ghost"}
                                    size="sm"
                                    asChild
                                    className={cn(
                                        "transition-all duration-200",
                                        isActive && "shadow-sm"
                                    )}
                                >
                                    <Link
                                        href={item.href}
                                        className="flex items-center gap-2"
                                    >
                                        <span className="text-sm">
                                            {item.icon}
                                        </span>
                                        <span className="hidden sm:inline">
                                            {item.label}
                                        </span>
                                    </Link>
                                </Button>
                            );
                        })}

                        <div className="hidden lg:flex items-center ml-4 pl-4 border-l">
                            <div className="text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span>Ready to develop</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
