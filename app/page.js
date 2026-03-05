import Link from "next/link";

export default function Home() {
    return (
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="absolute top-0 w-full h-full -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/20 via-background to-background"></div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-foreground">
                Your Personal <span className="text-primary">Book Manager</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
                A beautifully simple space for readers to log their books, reflect on their habits, and rediscover favorite authors.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-sm">
                <Link
                    href="/login"
                    className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-all flex-1 shadow-lg shadow-primary/25 active:scale-95"
                >
                    Login
                </Link>
                <Link
                    href="/signup"
                    className="px-6 py-3 rounded-xl bg-muted text-foreground border border-border font-medium hover:bg-muted/80 transition-all flex-1 active:scale-95"
                >
                    Sign Up
                </Link>
            </div>
        </main>
    );
}
