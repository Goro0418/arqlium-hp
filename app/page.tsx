const systems = [
  {
    code: "01",
    name: "レシート読み取りサービス",
    tag: "公開中",
    title: "レシートを撮るだけで、経費データに変換。",
    description:
      "AI OCRで店舗名、日付、品目、金額を読み取り、個人事業主や小規模事業者の経費整理を軽くします。",
    href: "https://arqlium-receipt.com",
    accent: "green",
  },
];

const strengths = [
  {
    label: "小さく始める",
    body: "最初から大きなシステムを作り込まず、現場で本当に使う機能から段階的に形にします。",
  },
  {
    label: "AIと業務を接続",
    body: "OCR、文章生成、分類、検索などのAI技術を、毎日の作業に自然に入る導線で実装します。",
  },
  {
    label: "運用まで見据える",
    body: "リリース後の入力負荷、確認フロー、データの見やすさまで含めて設計します。",
  },
];

export default function HomePage() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <a href="#" className="brand" aria-label="Arqlium home">
          Arql<span>ium</span>
        </a>
        <nav className="nav-links" aria-label="主要ナビゲーション">
          <a href="#systems">サービス</a>
          <a href="#approach">特徴</a>
          <a href="#contact">試してみる</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Systems and AI tools for small teams</p>
          <h1>日々の業務を、使いやすいシステムに変える。</h1>
          <p className="hero-lead">
            Arqliumは、AI OCRでレシートを経費データに変換する「レシート読み取りサービス」を
            企画・開発・運営しています。小さな現場の作業を軽くするWebサービスを目指しています。
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#systems">
              サービスを見る
            </a>
            <a className="button secondary" href="https://arqlium-receipt.com">
              レシート読み取りへ
            </a>
          </div>
        </div>

        <div
          className="hero-visual"
          aria-label="レシート読み取りサービスのイメージ"
        >
          <div className="visual-topbar">
            <span />
            <span />
            <span />
          </div>
          <div className="visual-grid">
            <div className="visual-panel featured">
              <span className="panel-kicker">Receipt OCR</span>
              <strong>￥12,480</strong>
              <p>店舗名・日付・金額を自動抽出</p>
            </div>
            <div className="visual-panel">
              <span className="panel-kicker">Items</span>
              <strong>5</strong>
              <p>読み取った品目数</p>
            </div>
            <div className="visual-panel">
              <span className="panel-kicker">Date</span>
              <strong>10/17</strong>
              <p>日付を自動認識</p>
            </div>
            <div className="visual-panel wide">
              <span className="panel-kicker">AI OCR</span>
              <p>レシート画像から、経費整理に必要な項目を読み取ります。</p>
              <div className="visual-bars">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section intro" id="approach">
        <div>
          <p className="section-label">Approach</p>
          <h2>小さな現場の作業を、ひとつずつ軽くする。</h2>
        </div>
        <p>
          日々の面倒な作業を、使いやすいWebサービスに置き換えることを目指しています。
          まずは負担の大きいレシート処理から、実際の使い方に合わせて改善を続けています。
        </p>
      </section>

      <section className="section" id="systems">
        <div className="section-heading">
          <p className="section-label">Service</p>
          <h2>提供中のサービス</h2>
          <p>
            Arqliumが現在公開しているサービスです。
            個人事業主や小規模事業者の経費整理にご利用いただけます。
          </p>
        </div>

        <div className="system-grid">
          {systems.map((system) => (
            <article
              className={`system-card system-card-${system.accent}`}
              key={system.name}
            >
              <div className="card-meta">
                <span>{system.code}</span>
                <span>{system.tag}</span>
              </div>
              <h3>{system.name}</h3>
              <h4>{system.title}</h4>
              <p>{system.description}</p>
              <a href={system.href}>サービスを見る</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section strength-band">
        <div className="section-heading compact">
          <p className="section-label">Strength</p>
          <h2>Arqliumが大切にしていること</h2>
        </div>
        <div className="strength-grid">
          {strengths.map((item) => (
            <div className="strength-item" key={item.label}>
              <h3>{item.label}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div>
          <p className="section-label">Contact</p>
          <h2>まずは、レシート読み取りをお試しください。</h2>
          <p>
            レシートを撮影するだけで、経費整理に必要なデータをAIが読み取ります。
          </p>
        </div>
        <a className="button primary light" href="https://arqlium-receipt.com">
          レシート読み取りを試す
        </a>
      </section>

      <footer className="footer">
        <div className="brand">
          Arql<span>ium</span>
        </div>
        <p>© 2026 Arqlium. All rights reserved.</p>
      </footer>
    </main>
  );
}
