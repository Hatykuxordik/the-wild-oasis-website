import { Josefin_Sans } from "next/font/google";
import "@/app/_styles/globals.css";
import Header from "@/app/_components/Header";
import type { Metadata } from "next";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
  icons: {
    icon: "/favicon.ico",
  },
  themeColor: "#0f172a",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />

        <div className="flex-1 px-4 md:px-8 py-4 md:py-12 grid grid-cols-1">
          <main className="max-w-7xl mx-auto w-full">{children}</main>
        </div>

        <footer className="text-center py-6 text-sm text-primary-500">
          <p>&copy; {new Date().getFullYear()} The Wild Oasis</p>
        </footer>
      </body>
    </html>
  );
}
