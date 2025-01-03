import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import syncUser from "@/backend/actions/auth/syncuser.server";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const user = await auth();
  let synced = false;

  if (user.userId && !synced)
  {
    console.log(await syncUser(user.userId));
    synced = true;
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
          {children}
          <Toaster/>
        </body>
      </html>
    </ClerkProvider>
  );
}
