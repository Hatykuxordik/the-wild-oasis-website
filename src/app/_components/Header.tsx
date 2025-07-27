import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";

function Header() {
  return (
    <header className="z-30 sticky top-0 bg-primary-900 border-b border-primary-900 px-4 py-4 md:px-8 md:py-5">
      <div className="flex justify-between md:items-center max-w-7xl mx-auto relative">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
