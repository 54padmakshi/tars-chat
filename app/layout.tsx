import { type Metadata } from "next";
import {Providers} from "./providers";


import "./globals.css";

export const metadata = {
  title: "Chat App",
  description: "Production Chat System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}