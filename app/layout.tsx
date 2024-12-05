import Navigation from "@/components/Navigation";
import { SessionProvider } from "next-auth/react";
import "@/global.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  description: "Официальный комментарий прокурора",
  title: "Прокурор разъясняет",
};

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="ru">
    <body className="bg-white text-slate-800">
      <SessionProvider>
        <Navigation />
        <div className="mx-auto my-8 px-2 max-w-4xl">{children}</div>
      </SessionProvider>
    </body>
  </html>
);

export default Layout;
