import "./globals.css";

import type { Metadata } from "next";

import TokenValidator from "@/components/auth/TokenValidator";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import QueryProvider from "@/components/providers/QueryProvider";
import { FONT } from "@/constants/font";

export const metadata: Metadata = {
  title: "PLAKE",
  description:
    "유저가 바쁜 일상 속 휴식을 위한 다양한 모임을 탐색하고 참여하며, 직접 모임을 개설하고 리뷰를 생성할 수 있는 서비스입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fe-adv-project-together-dallaem.vercel.app"
        />
        <link
          rel="preconnect"
          href="https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem"
        />
      </head>
      <body className={`${FONT.variable} antialiased`} suppressHydrationWarning>
        <QueryProvider>
          <Header />
          <main className="global-layout-wrapper">{children}</main>
          <Footer />
          <TokenValidator />
        </QueryProvider>
        <aside id="modal-root" />
      </body>
    </html>
  );
}
