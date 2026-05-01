import "./globals.css";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en"> {/* Changed to English since we are building in English now */}
    <body className="bg-[#FCF9F1] text-[#00236F] antialiased min-h-screen flex flex-col">
        {/* Navbar is fixed, so it sits on top of everything */}
        <Navbar />
        {/* Main content: removed the extra flex-col div to avoid height conflicts */}
        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}