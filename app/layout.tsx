const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="ru">
    <body>{children}</body>
  </html>
);

export default Layout;
