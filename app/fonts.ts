// app/fonts.ts - 전역 폰트 설정 (next/font)

import { Inter, Plus_Jakarta_Sans } from "next/font/google";

// Inter 폰트 (본문용)
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Plus Jakarta Sans 폰트 (제목용)
export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  weight: ["400", "700", "800"],
}); 