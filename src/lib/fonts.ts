import localFont from "next/font/local";
import { Noto_Sans_SC } from "next/font/google";

export const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
});

export const chineseFont = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-chinese",
  weight: ["400", "500", "700"],
});
