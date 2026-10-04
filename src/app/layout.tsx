import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "./provider";
import { Toaster } from "sonner";
export const metadata: Metadata = {
  title: "Voymate",
  description: "Connect with travelers and find travel mates.",
  applicationName: "Voymate",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Voymate",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f6e56",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-surface">
        <Providers>{children}</Providers>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
