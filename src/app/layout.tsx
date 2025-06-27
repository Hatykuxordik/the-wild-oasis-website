import Navigation from "./components/Navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>The Wild Oasis</title>
      </head>
      <body>
        <header>
          <Navigation />
        </header>
        {children}
      </body>
    </html>
  );
}
