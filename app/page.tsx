"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAuth = async () => {
    setLoading(true);
    setMessage("");

    // 入力チェック
    if (!email) {
      setMessage("エラー: メールアドレスを入力してください");
      setLoading(false);
      return;
    }
    if (!password) {
      setMessage("エラー: パスワードを入力してください");
      setLoading(false);
      return;
    }

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        if (error.message.includes("Password") || error.message.includes("password") || error.message.includes("characters")) {
          setMessage("エラー: パスワードは6文字以上で入力してください");
        } else if (error.message.includes("Unable to validate") || error.message.includes("valid")) {
          setMessage("エラー: 有効なメールアドレスを入力してください");
        } else if (!email) {
          setMessage("エラー: メールアドレスを入力してください");
        } else {
          setMessage("エラー: 登録に失敗しました。入力内容をご確認ください");
        }
      } else {
        setMessage("確認メールを送信しました。メールを確認してください。");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (error.message.includes("Email not confirmed")) {
          setMessage("エラー: メール認証が完了していません。確認メールのリンクをクリックしてください");
        } else if (error.message.includes("Invalid login")) {
          setMessage("エラー: メールアドレスまたはパスワードが正しくありません");
        } else {
          setMessage("エラー: ログインに失敗しました。入力内容をご確認ください");
        }
      } else {
        router.push("/upload");
      }
    }
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-2">🧾 レシート読み取り</h1>
        <p className="text-gray-500 text-center mb-6 text-sm">
          レシートを撮影してデータを自動抽出
        </p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {message && (
            <p className="text-sm text-center text-blue-600">{message}</p>
          )}

          <button
            onClick={handleAuth}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "処理中..." : isSignUp ? "新規登録" : "ログイン"}
          </button>

          {!isSignUp && (
            <button
              onClick={() => router.push("/reset-password")}
              className="w-full text-sm text-gray-400 hover:text-gray-600"
            >
              パスワードをお忘れの方はこちら
            </button>
          )}

          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full text-sm text-gray-500 hover:text-gray-700"
          >
            {isSignUp ? "ログインはこちら" : "新規登録はこちら"}
          </button>

          <div className="flex justify-center gap-4 pt-2 flex-wrap">
            <a href="/help" className="text-xs text-gray-400 hover:text-gray-600">ヘルプ</a>
            <a href="/privacy" className="text-xs text-gray-400 hover:text-gray-600">プライバシーポリシー</a>
            <a href="/terms" className="text-xs text-gray-400 hover:text-gray-600">利用規約</a>
            <a href="/legal" className="text-xs text-gray-400 hover:text-gray-600">特定商取引法に基づく表記</a>
          </div>
        </div>
      </div>
    </main>
  );
}