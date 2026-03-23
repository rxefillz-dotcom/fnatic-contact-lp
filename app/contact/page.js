import ContactForm from "../../components/ContactForm";

export const metadata = {
  title: "お問い合わせ｜れいたのサービス",
  description: "フォームでお問い合わせを送信できます。",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
        <h1 className="text-2xl font-semibold">お問い合わせ</h1>
        <p className="mt-2 text-sm text-zinc-300">
          入力内容を確認して送信してください。空欄や形式が違う場合はエラーを表示します。
        </p>

        <div className="mt-6">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

