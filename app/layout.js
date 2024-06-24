import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Somana | Generative Transformer",
  description: "Somana AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`flex text-sm flex-col h-screen ${inter.className}`}>
        <header className="sticky top-0 left-0 right-0 w-full z-50">
          <Header />
        </header>
        <div className="flex flex-grow ">
          <aside className="w-1/5  h-full">
            <SideBar />
          </aside>
          <main className="flex-grow  overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
