"use client";

import { useState, useEffect, useRef } from "react";

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );
    Object.values(refs.current).forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => {
    refs.current[id] = el;
  };

  const fadeIn = (id: string, delay = 0) => ({
    id,
    ref: setRef(id),
    style: {
      opacity: visible[id] ? 1 : 0,
      transform: visible[id] ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    },
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --ink: #1a1a18;
          --ink-light: #5a5a55;
          --paper: #fafaf7;
          --paper-warm: #f4f3ee;
          --accent: #2d6a4f;
          --accent-light: #40916c;
          --accent-pale: #d8f3dc;
          --rule: #e8e8e2;
          --serif: 'DM Serif Display', Georgia, serif;
          --sans: 'DM Sans', system-ui, sans-serif;
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: var(--sans);
          background: var(--paper);
          color: var(--ink);
          line-height: 1.6;
          overflow-x: hidden;
        }

        /* NAV */
        nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2.5rem;
          height: 64px;
          background: rgba(250,250,247,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--rule);
          transition: box-shadow 0.3s;
        }

        .nav-logo {
          font-family: var(--serif);
          font-size: 1.4rem;
          letter-spacing: -0.02em;
          color: var(--ink);
          text-decoration: none;
        }

        .nav-logo span { color: var(--accent); }

        .nav-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--ink);
          color: var(--paper);
          padding: 0.5rem 1.25rem;
          border-radius: 2rem;
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
        }

        .nav-cta:hover {
          background: var(--accent);
          transform: translateY(-1px);
        }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 7rem 2.5rem 4rem;
          max-width: 960px;
          margin: 0 auto;
          position: relative;
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 1.5rem;
          opacity: 0;
          animation: fadeUp 0.8s ease 0.2s forwards;
        }

        .hero-eyebrow::before {
          content: '';
          display: block;
          width: 2rem;
          height: 1px;
          background: var(--accent);
        }

        .hero-title {
          font-family: var(--serif);
          font-size: clamp(2.8rem, 7vw, 5.5rem);
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: var(--ink);
          margin-bottom: 1.5rem;
          opacity: 0;
          animation: fadeUp 0.8s ease 0.4s forwards;
        }

        .hero-title em {
          font-style: italic;
          color: var(--accent);
        }

        .hero-sub {
          font-size: clamp(1rem, 2vw, 1.15rem);
          color: var(--ink-light);
          max-width: 520px;
          margin-bottom: 2.5rem;
          font-weight: 300;
          line-height: 1.7;
          opacity: 0;
          animation: fadeUp 0.8s ease 0.6s forwards;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          opacity: 0;
          animation: fadeUp 0.8s ease 0.8s forwards;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--ink);
          color: var(--paper);
          padding: 0.85rem 2rem;
          border-radius: 2rem;
          font-size: 0.95rem;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }

        .btn-primary:hover {
          background: var(--accent);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(45,106,79,0.25);
        }

        .btn-secondary {
          font-size: 0.9rem;
          color: var(--ink-light);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          transition: color 0.2s;
        }

        .btn-secondary:hover { color: var(--ink); }

        .hero-decoration {
          position: absolute;
          right: -2rem;
          top: 50%;
          transform: translateY(-50%);
          width: 380px;
          height: 380px;
          border-radius: 50%;
          background: radial-gradient(circle at 40% 40%, var(--accent-pale), transparent 70%);
          pointer-events: none;
          opacity: 0;
          animation: fadeIn 1.2s ease 1s forwards;
        }

        /* SECTION COMMON */
        section {
          padding: 6rem 2.5rem;
          max-width: 960px;
          margin: 0 auto;
        }

        .section-divider {
          width: 100%;
          height: 1px;
          background: var(--rule);
          max-width: 960px;
          margin: 0 auto;
        }

        .section-label {
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .section-label::before {
          content: '';
          display: block;
          width: 1.5rem;
          height: 1px;
          background: var(--accent);
        }

        .section-title {
          font-family: var(--serif);
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }

        .section-desc {
          color: var(--ink-light);
          font-size: 1rem;
          font-weight: 300;
          max-width: 480px;
          line-height: 1.75;
          margin-bottom: 3rem;
        }

        /* ABOUT */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .about-mission {
          font-family: var(--serif);
          font-size: 1.5rem;
          line-height: 1.5;
          color: var(--ink);
          border-left: 2px solid var(--accent);
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .about-body {
          color: var(--ink-light);
          font-weight: 300;
          line-height: 1.8;
        }

        .about-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .stat-card {
          background: var(--paper-warm);
          border: 1px solid var(--rule);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .stat-number {
          font-family: var(--serif);
          font-size: 2.2rem;
          color: var(--accent);
          line-height: 1;
          margin-bottom: 0.4rem;
        }

        .stat-label {
          font-size: 0.82rem;
          color: var(--ink-light);
          font-weight: 400;
        }

        /* FEATURES */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .feature-card {
          background: var(--paper-warm);
          border: 1px solid var(--rule);
          border-radius: 16px;
          padding: 2rem 1.75rem;
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
        }

        .feature-card:hover {
          border-color: var(--accent-light);
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.06);
        }

        .feature-icon {
          width: 44px;
          height: 44px;
          background: var(--accent-pale);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          margin-bottom: 1.25rem;
        }

        .feature-title {
          font-family: var(--serif);
          font-size: 1.15rem;
          margin-bottom: 0.6rem;
          letter-spacing: -0.01em;
        }

        .feature-desc {
          font-size: 0.88rem;
          color: var(--ink-light);
          line-height: 1.7;
          font-weight: 300;
        }

        /* STEPS */
        .steps-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .step-item {
          display: grid;
          grid-template-columns: 64px 1fr;
          gap: 2rem;
          padding: 2.5rem 0;
          border-bottom: 1px solid var(--rule);
          align-items: start;
        }

        .step-item:last-child { border-bottom: none; }

        .step-number {
          font-family: var(--serif);
          font-size: 3rem;
          color: var(--rule);
          line-height: 1;
          font-style: italic;
        }

        .step-content-title {
          font-family: var(--serif);
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          letter-spacing: -0.01em;
        }

        .step-content-desc {
          font-size: 0.9rem;
          color: var(--ink-light);
          line-height: 1.75;
          font-weight: 300;
        }

        /* PRICING */
        .pricing-card {
          background: var(--ink);
          color: var(--paper);
          border-radius: 24px;
          padding: 3rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .pricing-badge {
          display: inline-block;
          background: var(--accent-pale);
          color: var(--accent);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.3rem 0.75rem;
          border-radius: 2rem;
          margin-bottom: 1rem;
        }

        .pricing-name {
          font-family: var(--serif);
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
        }

        .pricing-desc {
          font-size: 0.9rem;
          color: rgba(250,250,247,0.6);
          font-weight: 300;
          line-height: 1.7;
        }

        .pricing-amount {
          text-align: center;
        }

        .pricing-price {
          font-family: var(--serif);
          font-size: 4rem;
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .pricing-unit {
          font-size: 0.85rem;
          color: rgba(250,250,247,0.5);
          margin-bottom: 2rem;
        }

        .pricing-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 2rem;
          text-align: left;
        }

        .pricing-features li {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.88rem;
          color: rgba(250,250,247,0.8);
        }

        .pricing-features li::before {
          content: '✓';
          color: var(--accent-light);
          font-weight: 600;
          flex-shrink: 0;
        }

        .btn-pricing {
          display: block;
          width: 100%;
          background: var(--paper);
          color: var(--ink);
          text-align: center;
          padding: 0.9rem;
          border-radius: 2rem;
          font-weight: 500;
          font-size: 0.95rem;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
        }

        .btn-pricing:hover {
          background: var(--accent-pale);
          transform: translateY(-1px);
        }

        /* FOOTER */
        footer {
          border-top: 1px solid var(--rule);
          padding: 2.5rem;
          max-width: 960px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-logo {
          font-family: var(--serif);
          font-size: 1.1rem;
          color: var(--ink);
        }

        .footer-logo span { color: var(--accent); }

        .footer-links {
          display: flex;
          gap: 1.5rem;
        }

        .footer-links a {
          font-size: 0.82rem;
          color: var(--ink-light);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-links a:hover { color: var(--ink); }

        .footer-copy {
          font-size: 0.78rem;
          color: var(--ink-light);
          width: 100%;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .ad-label {
          font-size: 11px;
          color: #666;
          text-align: center;
          margin-bottom: 4px;
        }

        .floating-ad {
          position: fixed;
          right: 30px;
          bottom: 30px;
          z-index: 9999;
        
          background: white;
          padding: 8px;
          border-radius: 12px;
        
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .floating-ad:hover {
          transform: translateY(-2px);
        }
        
        .floating-ad img {
          display: block;
        }

        @media (max-width: 768px) {
          nav { padding: 0 1.25rem; }
          .hero { padding: 6rem 1.25rem 3rem; }
          section { padding: 4rem 1.25rem; }
          
          .floating-ad {
            display: none;
          }
          
          .about-grid { grid-template-columns: 1fr; }
          .features-grid { grid-template-columns: 1fr; }
          .pricing-card { grid-template-columns: 1fr; }
          .pricing-amount { text-align: left; }
          .hero-decoration { display: none; }
          footer { padding: 2rem 1.25rem; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ boxShadow: scrollY > 10 ? "0 1px 12px rgba(0,0,0,0.06)" : "none" }}>
        <a href="#" className="nav-logo">Arql<span>ium</span></a>
        <a href="https://arqlium-receipt.com" className="nav-cta">
          サービスを試す →
        </a>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-decoration" />
        <p className="hero-eyebrow">レシートクラウド by Arqlium</p>
        <h1 className="hero-title">
          レシートを、<br />
          <em>そのままデータに。</em>
        </h1>
        <p className="hero-sub">
          AIがレシートを読み取り、店舗名・日付・商品名・金額を自動で整理。個人事業主の確定申告をもっとシンプルに。
        </p>
        <div className="hero-actions">
          <a href="https://arqlium-receipt.com" className="btn-primary">
            今すぐ無料で試す →
          </a>
          <a href="#features" className="btn-secondary">
            機能を見る ↓
          </a>
        </div>
      </div>

      <div className="section-divider" />

      {/* ABOUT */}
      <section {...fadeIn("about")}>
        <p className="section-label">About</p>
        <div className="about-grid">
          <div>
            <p className="about-mission">
              テクノロジーで、個人事業主の雑務をゼロにする。
            </p>
            <p className="about-body">
              Arqliumは、個人開発者が運営するテクノロジースタジオです。AIとクラウドの力で、小さなビジネスを動かす人たちの、面倒な作業を自動化するプロダクトを作り続けています。
            </p>
          </div>
          <div className="about-stats">
            {[
              { num: "AI", label: "Google Document AI + Claude による高精度OCR" },
              { num: "¥0.3", label: "1枚あたりのコスト（業界最安水準）" },
              { num: "即時", label: "決済完了後すぐに利用開始" },
              { num: "100%", label: "クラウド完結・インストール不要" },
            ].map((s, i) => (
              <div key={i} className="stat-card">
                <div className="stat-number">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* FEATURES */}
      <section {...fadeIn("features")}>
        <p className="section-label">Features</p>
        <h2 className="section-title">主な機能</h2>
        <p className="section-desc">写真を撮るだけ。あとはAIがすべてやってくれます。</p>
        <div className="features-grid">
          {[
            { icon: "📷", title: "AI自動読み取り", desc: "Google Document AIとClaude APIが連携し、手書きレシートも含む日本語レシートを高精度で読み取ります。" },
            { icon: "🗂️", title: "データ自動構造化", desc: "店舗名・日付・商品名・金額を自動で分類・整理。確定申告に必要な形式でいつでも確認できます。" },
            { icon: "📜", title: "履歴管理", desc: "読み取ったレシートはクラウドに保存。いつでも検索・閲覧・削除が可能です。" },
            { icon: "🔒", title: "セキュア認証", desc: "Supabase Authによる安全なアカウント管理。大切なデータをしっかり守ります。" },
            { icon: "💳", title: "クレジット制", desc: "使った分だけ支払うクレジット制。月額不要で、必要なときだけ購入できます。" },
            { icon: "☁️", title: "完全クラウド", desc: "インストール不要。スマートフォンのブラウザから、その場でレシートを読み取れます。" },
          ].map((f, i) => (
            <div key={i} className="feature-card" style={{
              opacity: visible["features"] ? 1 : 0,
              transform: visible["features"] ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
            }}>
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* STEPS */}
      <section {...fadeIn("steps")}>
        <p className="section-label">How it works</p>
        <h2 className="section-title">使い方</h2>
        <p className="section-desc">3ステップで経理完了。難しい設定は一切不要です。</p>
        <div className="steps-list">
          {[
            { title: "アカウントを作成する", desc: "メールアドレスで無料登録。30秒で完了します。" },
            { title: "クレジットを購入する", desc: "¥500で30枚分のクレジットを購入。クレジットカードで即時決済されます。" },
            { title: "レシートをアップロードする", desc: "レシートの写真（JPEG・PNG・PDF）をアップロードするだけ。AIが自動で内容を読み取り、データを整理します。" },
          ].map((s, i) => (
            <div key={i} className="step-item" style={{
              opacity: visible["steps"] ? 1 : 0,
              transform: visible["steps"] ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
            }}>
              <div className="step-number">0{i + 1}</div>
              <div>
                <div className="step-content-title">{s.title}</div>
                <p className="step-content-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* PRICING */}
      <section {...fadeIn("pricing")}>
        <p className="section-label">Pricing</p>
        <h2 className="section-title">料金プラン</h2>
        <p className="section-desc">月額不要。使った分だけのシンプルな料金体系です。</p>
        <div className="pricing-card">
          <div>
            <span className="pricing-badge">クレジットパック</span>
            <div className="pricing-name">レシート読み取りパック</div>
            <p className="pricing-desc">
              一度購入したクレジットは有効期限なし。必要なときに必要な分だけ使えます。
            </p>
          </div>
          <div className="pricing-amount">
            <div className="pricing-price">¥500</div>
            <div className="pricing-unit">30枚分のクレジット（1枚あたり約¥17）</div>
            <ul className="pricing-features">
              <li>レシート読み取り30回分</li>
              <li>JPEG・PNG・PDF対応</li>
              <li>データの永久保存</li>
              <li>クレジット有効期限なし</li>
            </ul>
            <a href="https://arqlium-receipt.com" className="btn-pricing">
              今すぐ始める →
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="section-divider" />
      <footer>
        <div className="footer-logo">Arql<span>ium</span></div>
        <div className="footer-links">
          <a href="https://arqlium-receipt.com/legal">特定商取引法</a>
          <a href="https://arqlium-receipt.com/privacy">プライバシーポリシー</a>
          <a href="https://arqlium-receipt.com/terms">利用規約</a>
        </div>
        <p className="footer-copy">© 2026 Arqlium. All rights reserved.</p>
      </footer>


      <div className="floating-ad">
        
        <div className="ad-label">PR</div>
        
        {/* A8広告 */}
        <a
          href="https://px.a8.net/svt/ejp?a8mat=4B1N9S+2J3CC2+0K+10A5LT"
          rel="nofollow noreferrer"
          target="_blank"
        >
          <img
            src="https://www23.a8.net/svt/bgt?aid=260417296153&wid=001&eno=01&mid=s00000000002006094000&mc=1"
            width="234"
            height="60"
            alt="おすすめサービス"
          />
        </a>
      
        <img
          src="https://www13.a8.net/0.gif?a8mat=4B1N9S+2J3CC2+0K+10A5LT"
          width="1"
          height="1"
          alt=""
        />

        {/* お名前.com広告 */}
        <a
            href="https://px.a8.net/svt/ejp?a8mat=4B1N9S+2JORXU+50+2HU3GX"
            rel="nofollow noreferrer"
            target="_blank"
          >
            <img
              src="https://www26.a8.net/svt/bgt?aid=260417296154&wid=001&eno=01&mid=s00000000018015089000&mc=1"
              width="234"
              height="60"
              alt="お名前.com"
            />
          </a>
        
          <img
            src="https://www19.a8.net/0.gif?a8mat=4B1N9S+2JORXU+50+2HU3GX"
            width="1"
            height="1"
            alt=""
          />
      </div>

    </>
  );
}
