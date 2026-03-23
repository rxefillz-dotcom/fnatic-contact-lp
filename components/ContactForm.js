"use client";

import { useMemo, useState } from "react";

function isValidEmail(email) {
  // シンプルな正規表現（厳密判定ではなく実用寄り）
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactForm() {
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ name: "", email: "", message: "" });

  const canSubmit = useMemo(() => status !== "submitting", [status]);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("idle");
    setFormError("");
    setFieldErrors({ name: "", email: "", message: "" });

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const nextFieldErrors = { name: "", email: "", message: "" };

    if (!name) nextFieldErrors.name = "お名前を入力してください。";
    if (!email) nextFieldErrors.email = "メールアドレスを入力してください。";
    else if (!isValidEmail(email)) nextFieldErrors.email = "メール形式が正しくありません。";
    if (!message) nextFieldErrors.message = "内容を入力してください。";
    else if (message.length > 500)
      nextFieldErrors.message = "内容が長すぎます（500文字以内）。";

    const hasError = Object.values(nextFieldErrors).some(Boolean);
    if (hasError) {
      setFieldErrors(nextFieldErrors);
      setStatus("error");
      return;
    }

    if (!endpoint) {
      setFormError("送信先（フォーム連携エンドポイント）が未設定です。管理者へ連絡してください。");
      setStatus("error");
      return;
    }

    try {
      setStatus("submitting");

      // Formspree等：Accept: application/json でJSONレスポンスを返す設定にできる場合が多いです
      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        setFormError("送信に失敗しました。もう一度お試しください。");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setFormError("通信に失敗しました。ネットワークを確認して、もう一度お試しください。");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" aria-busy={status === "submitting"}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <div className="text-sm font-medium text-zinc-200">お名前</div>
          <input
            name="name"
            type="text"
            autoComplete="name"
            placeholder="例）山田 太郎"
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-50 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            disabled={!canSubmit}
          />
          {fieldErrors.name ? (
            <p className="mt-1 text-xs text-red-400">{fieldErrors.name}</p>
          ) : null}
        </label>

        <label className="block">
          <div className="text-sm font-medium text-zinc-200">メールアドレス</div>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="example@email.com"
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-50 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            disabled={!canSubmit}
          />
          {fieldErrors.email ? (
            <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
          ) : null}
        </label>
      </div>

      <label className="block">
        <div className="text-sm font-medium text-zinc-200">お問い合わせ内容</div>
        <textarea
          name="message"
          rows={5}
          placeholder="例）ホームページ制作の相談です。希望はデザイン調整込みで、納期は◯月頃です。"
          className="mt-1 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-50 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          disabled={!canSubmit}
        />
        {fieldErrors.message ? (
          <p className="mt-1 text-xs text-red-400">{fieldErrors.message}</p>
        ) : null}
      </label>

      {formError ? (
        <p className="text-sm text-red-400" aria-live="polite">
          {formError}
        </p>
      ) : null}

      {status === "success" ? (
        <p className="text-sm text-emerald-300" aria-live="polite">
          送信しました。ご確認ください。
        </p>
      ) : null}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-cyan-400 px-5 text-sm font-semibold text-zinc-950 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "送信中..." : "送信する"}
        </button>
        <button
          type="reset"
          disabled={!canSubmit}
          className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 bg-transparent px-5 text-sm font-semibold text-zinc-100 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          入力を消す
        </button>
      </div>

      <p className="text-xs text-zinc-500">
        ※送信先は `NEXT_PUBLIC_CONTACT_ENDPOINT`（フォーム連携エンドポイント）で差し替えます。
      </p>
    </form>
  );
}

