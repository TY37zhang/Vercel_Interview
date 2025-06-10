import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16 max-w-7xl">
                {/* Hero Section */}
                <div className="text-center mb-12 lg:mb-16">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                            Vercel Interview Prep
                        </h1>
                        <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
                            Full-stack Next.js application ready for development
                            with modern tools and best practices
                        </p>

                        {/* Tech Stack Badges */}
                        <div className="flex flex-wrap justify-center gap-2 mb-8">
                            <Badge
                                variant="secondary"
                                className="text-sm px-3 py-1"
                            >
                                Next.js 15
                            </Badge>
                            <Badge
                                variant="secondary"
                                className="text-sm px-3 py-1"
                            >
                                React 19
                            </Badge>
                            <Badge
                                variant="secondary"
                                className="text-sm px-3 py-1"
                            >
                                TypeScript
                            </Badge>
                            <Badge
                                variant="secondary"
                                className="text-sm px-3 py-1"
                            >
                                Tailwind CSS
                            </Badge>
                            <Badge
                                variant="secondary"
                                className="text-sm px-3 py-1"
                            >
                                shadcn/ui
                            </Badge>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                variant="outline"
                                size="lg"
                                className="text-base px-8"
                            >
                                📚 API Documentation
                            </Button>
                        </div>
                    </div>
                </div>

                <Separator className="mb-12" />

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mb-12">
                    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                        <CardHeader className="pb-4">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">🎨</span>
                            </div>
                            <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                UI Components
                            </CardTitle>
                            <CardDescription className="text-base">
                                Pre-built shadcn/ui components ready to use with
                                consistent design
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="space-y-3">
                                <Button className="w-full" variant="outline">
                                    Example Button
                                </Button>
                                <div className="text-sm text-muted-foreground leading-relaxed">
                                    20+ components including buttons, cards,
                                    forms, dialogs, and navigation elements
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                        <CardHeader className="pb-4">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">🔧</span>
                            </div>
                            <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                API Routes
                            </CardTitle>
                            <CardDescription className="text-base">
                                Full-stack backend endpoints with TypeScript
                                support
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="space-y-2">
                                <code className="text-sm bg-muted p-2 rounded-md block font-mono">
                                    GET /api/users
                                </code>
                                <code className="text-sm bg-muted p-2 rounded-md block font-mono">
                                    POST /api/tasks
                                </code>
                                <div className="text-sm text-muted-foreground pt-2">
                                    CRUD operations with validation and error
                                    handling
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 md:col-span-2 xl:col-span-1">
                        <CardHeader className="pb-4">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">📱</span>
                            </div>
                            <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                Responsive Design
                            </CardTitle>
                            <CardDescription className="text-base">
                                Mobile-first approach with modern responsive
                                patterns
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-sm text-muted-foreground leading-relaxed">
                                Built with Tailwind CSS utilities for rapid
                                development and consistent spacing across all
                                devices
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Developer Experience Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle className="text-2xl flex items-center gap-3">
                                <span className="text-3xl">⚡</span>
                                Quick Start
                            </CardTitle>
                            <CardDescription className="text-base">
                                Get up and running in seconds
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span className="text-xs text-slate-400 ml-2">
                                            Terminal
                                        </span>
                                    </div>
                                    <code className="text-green-400 font-mono text-sm block">
                                        $ npm run dev
                                    </code>
                                    <code className="text-slate-300 font-mono text-xs block mt-1">
                                        ▲ Next.js 15.3.3
                                        <br />- Local: http://localhost:3000
                                    </code>
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div>
                                        <h4 className="font-medium text-sm mb-1">
                                            Development
                                        </h4>
                                        <code className="text-xs bg-muted p-2 rounded block">
                                            npm run dev
                                        </code>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-sm mb-1">
                                            Production
                                        </h4>
                                        <code className="text-xs bg-muted p-2 rounded block">
                                            npm run build
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle className="text-2xl flex items-center gap-3">
                                <span className="text-3xl">🛠️</span>
                                Ready Features
                            </CardTitle>
                            <CardDescription className="text-base">
                                Everything you need for rapid development
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-sm">
                                            TypeScript
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-sm">
                                            API Routes
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-sm">
                                            UI Components
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-sm">
                                            Responsive
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-sm">
                                            Dark Mode
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-sm">
                                            Type Safety
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-sm">ESLint</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-sm">
                                            Turbopack
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Call to Action */}
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-2 border-blue-200 dark:border-blue-800">
                    <CardContent className="p-8 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            Ready for your Vercel interview! 🚀
                        </h2>
                        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                            This application provides everything you need to
                            build impressive full-stack features during your
                            technical interview
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                variant="outline"
                                size="lg"
                                className="text-base px-8"
                            >
                                View API Endpoints
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
