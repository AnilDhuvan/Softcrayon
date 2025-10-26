import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../assets/style/globals.css";
import NextTopLoader from "nextjs-toploader";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SoftCrayons - Best Coaching Institute for IT & Professional Courses",
  description:
    "Transform your career with industry-leading courses in Web Development, Data Science, Digital Marketing, and more. Expert instructors, hands-on projects, and job assistance.",
  keywords:
    "coaching institute, web development course, data science training, digital marketing, IT courses, online learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <NextTopLoader color="#1976d2" height={3} showSpinner={false} />
        {children}
      </body>
    </html>
  );
}
