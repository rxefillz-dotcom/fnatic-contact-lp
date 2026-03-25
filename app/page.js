import Link from "next/link";
import FaqAccordion from "../components/FaqAccordion";

const FEATURES = [
  { title: "短いフォームで送れる", desc: "必要な情報だけを入力して、すぐ送信できます。" },
  { title: "入力チェック付き", desc: "空欄やメール形式など、送信前にルール確認します。" },
  { title: "スマホでも見やすい", desc: "レスポンシブ設計で、縦長でも読みやすいレイアウト。" },
];

const FAQ_ITEMS = [
  { question: "どれくらいで返信？", answer: "目安：24〜48時間" },
  { question: "送信先はどこ？", answer: "Gmailへ届く設定が可能" },
  { question: "対応範囲は？", answer: "ご要望をヒアリング" },
];

export const metadata = {
  title: "れいたの問い合わせLP",
  description: "お問い合わせ内容を送信できます（フォーム送信連携つき）。",
  openGraph: {
    title: "れいたの問い合わせLP",
    description: "お問い合わせ内容を送信できます（フォーム送信連携つき）。",
    url: "https://fnatic-contact-lp.vercel.app",
    type: "website",
    images: [
      {
        url: "/ogp-landscape.png",
        width: 993,
        height: 691,
        alt: "お問い合わせフォームLP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "れいたの問い合わせLP",
    description: "お問い合わせ内容を送信できます（フォーム送信連携つき）。",
    images: ["/ogp-landscape.png"],
  },
};

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <div className="inline-flex items-center rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
              お問い合わせフォームLP（商品化用テンプレ）
            </div>
            <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              必要な連絡を、迷わず送れる。
              <br />
              スマホでも見やすい問い合わせページ。
            </h1>
            <p className="mt-3 text-zinc-300">
              このページはフォーム送信連携（例：Formspree）に対応しています。
              入力→送信→結果が表示されるところまで、体験できます。
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-cyan-400 px-5 text-sm font-semibold text-zinc-950 hover:bg-cyan-300"
              >
                お問い合わせへ
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 bg-transparent px-5 text-sm font-semibold text-zinc-100 hover:bg-white/5"
              >
                まずは送信体験
              </Link>
            </div>
          </div>

          <div className="lg:w-[320px]">
            <div className="rounded-xl bg-zinc-900/40 p-4 ring-1 ring-white/10">
              <div className="text-sm font-semibold">よくある質問（例）</div>
              <FaqAccordion items={FAQ_ITEMS} defaultOpenIndex={0} />
              <div className="mt-4 text-xs text-zinc-400">
                ※文言は納品物として差し替えます。
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">このLPでできること</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="text-sm font-semibold">{f.title}</div>
              <div className="mt-2 text-sm text-zinc-300">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold">次のステップ（納品イメージ）</h2>
        <ol className="mt-3 list-decimal pl-5 text-sm text-zinc-300">
          <li>フォームの文言（質問項目）をあなた用に調整</li>
          <li>送信先（Gmailへ届く設定）をフォーム連携で接続</li>
          <li>スマホ表示と送信体験を確認して納品</li>
        </ol>
      </section>
    </div>
  );
}
