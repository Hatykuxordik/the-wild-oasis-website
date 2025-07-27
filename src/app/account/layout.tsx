import { ReactNode } from "react";
import SideNavigation from "@/app/_components/SideNavigation";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col md:grid md:grid-cols-[16rem_1fr] md:h-full gap-12 md:gap-24">
      <SideNavigation />
      <div className="py-1">{children}</div>
    </div>
  );
}
