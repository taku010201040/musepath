import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    themeColor: "#667eea",
};

export const metadata: Metadata = {
    title: "MusePath - あなたの可能性を見つける",
    description: "AI搭載型SNSで、あなたの潜在的な興味・関心を発見し、最適な学びと進路を提案します",
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "MusePath",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            </head>
            <body className="antialiased min-h-screen">
                {children}
            </body>
        </html>
    );
}
