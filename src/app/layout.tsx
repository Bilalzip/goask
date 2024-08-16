import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Providers from "@/components/Provider";
import Footer from "@/components/Footer/Footer";
import { StoreProvider } from "@/store/Provider";
// import Navbar from "@/components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GoAskPDF",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <Providers>
        <html lang="en">
          <body className={inter.className}>
            <div>
              {/* <Navbar /> */}
              {children}
              <Footer />
            </div>
          </body>
        </html>
      </Providers>
    </StoreProvider>
  );
}
