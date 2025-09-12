import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "./providers";



export const metadata: Metadata = {
  title: "Recipe Book",
  description: "Dynamic Meal Recipe Page with React, NextJS and Typescript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
        <Header/>
        <main>{children}</main> 
        <Footer/>
        </Providers>
      </body>
    </html>
  );
}
