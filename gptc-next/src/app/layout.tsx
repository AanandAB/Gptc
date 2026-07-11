import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Government Polytechnic College Kannur – Knowledge is Power",
  description: "GPTC Kannur, established in 1958, offers diploma programmes in Civil, Electrical, Electronics, Mechanical, Textile Technology and Wood & Paper Technology.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/site.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
