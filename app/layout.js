import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Todo",
  description: "Web Keep Work",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="night">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
