import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
  showWhatsApp?: boolean;
}

export function Layout({ children, showFooter = true, showWhatsApp = true }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      {showFooter && <Footer />}
      {showWhatsApp && <WhatsAppButton />}
    </div>
  );
}
