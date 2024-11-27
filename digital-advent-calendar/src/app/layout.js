import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: "one day",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Style+Script&display=swap"
          rel="stylesheet"
        /> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Lavishly+Yours&family=Roboto+Slab:wght@100..900&family=Style+Script&display=swap" rel="stylesheet" />

      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
