import type { Metadata } from "next";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import '@fortawesome/fontawesome-svg-core/styles.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],      
  weight: ["400", "700"],  
  variable: "--space-grotesk",
});

export const metadata: Metadata = {
  title: "Weather App",
  description: "Get current weather and forecasts for any city",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
      className={`${spaceGrotesk.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
