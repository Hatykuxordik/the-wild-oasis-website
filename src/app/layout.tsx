import Logo from "./components/Logo";
import Navigation from "./components/Navigation";

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
      <body>
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
