import Navigation from "@/components/Navigation";
import { SessionProvider } from "next-auth/react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="ru">
    <body>
      <SessionProvider>
        <Navigation />
        {children}
      </SessionProvider>
    </body>
  </html>
);

export default Layout;
