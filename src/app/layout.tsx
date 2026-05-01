import "./globals.css";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en"> 
    <body className="bg-[#FCF9F1] text-[#00236F] antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}