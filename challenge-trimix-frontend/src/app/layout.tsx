import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/redux/StoreProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personas ABM",
  description: "Trimix Challenge Personas ABM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body suppressHydrationWarning={true} className={inter.className}>
          <Toaster toastOptions={{ className: "toast" }} />
          {children}
        </body>
      </StoreProvider>
    </html>
  );
}
