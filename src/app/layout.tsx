import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

import "@/app/_styles/globals.css";

export const metadata = {
  title: "The Wild Oasis",
  description: "A serene getaway in the heart of nature",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-primary-950 text-primary-100 min-h-screen">
        <header>
          <Logo />
          <Navigation />
        </header>

        <main>{children}</main>

        <footer>
          <p>&copy; {new Date().getFullYear()} The Wild Oasis</p>
        </footer>
      </body>
    </html>
  );
}
