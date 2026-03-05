import "./globals.css";

export const metadata = {
    title: "Personal Book Manager",
    description: "A beautifully simple space for readers to log their books.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="antialiased min-h-screen flex flex-col selection:bg-primary selection:text-white">
                {children}
            </body>
        </html>
    );
}
