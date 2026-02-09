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
  title: 'Weather App',
  icons: {
      icon: '/icon.ico',
  },
  description: 'Check the weather in any city around the world.',
  keywords: ['weather', 'forecast', 'temperature', 'Next.js'],
  openGraph: {
    title: 'Weather App',
    description: 'Check the weather in any city around the world.',
    siteName: 'WeatherApp',
    locale: 'en_US',
    type: 'website',
  },
}

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
