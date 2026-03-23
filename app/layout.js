import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "れいたの問い合わせLP",
  description: "お問い合わせ内容を送信できます（フォーム送信連携つき）。",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-50">
        <header className="w-full border-b border-white/10">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-cyan-400/15 ring-1 ring-cyan-300/20" />
              <div className="leading-tight">
                <div className="text-sm font-semibold text-zinc-100">れいたのサービス</div>
                <div className="text-xs text-zinc-400">お問い合わせフォーム</div>
              </div>
            </div>
            <nav className="flex items-center gap-3">
              <Link
                href="/"
                className="rounded-md px-3 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-zinc-50"
              >
                トップ
              </Link>
              <Link
                href="/contact"
                className="rounded-md bg-cyan-400 px-3 py-2 text-sm font-semibold text-zinc-900 hover:bg-cyan-300"
              >
                送信する
              </Link>
            </nav>
          </div>
        </header>

        <div className="flex-1 w-full">{children}</div>

        <footer className="w-full border-t border-white/10">
          <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-6 text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} れいたのサービス</span>
            <span>フォーム送信連携は環境変数で差し替えます</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
