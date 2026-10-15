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
  {
    code: "02",
    name: "業務管理システム",
    tag: "構築相談",
    title: "予約、顧客、案件の流れをひとつに。",
    description:
      "店舗や小規模チーム向けに、予約受付、顧客メモ、進捗管理をまとめた使いやすい管理画面を設計します。",
    href: "#contact",
    accent: "blue",
  },
  {
    code: "03",
    name: "在庫・発注サポート",
    tag: "構築相談",
    title: "在庫の見落としと発注漏れを減らす。",
    description:
      "入出庫、しきい値アラート、発注リスト作成など、日々の確認作業をシンプルな仕組みに落とし込みます。",
    href: "#contact",
    accent: "amber",
  },
  {
    code: "04",
    name: "AI問い合わせアシスタント",
    tag: "構築相談",
    title: "よくある質問への回答を自動化。",
    description:
      "Webサイトや社内資料をもとに、問い合わせ対応や社内ナレッジ検索を助けるAIアシスタントを導入します。",
    href: "#contact",
    accent: "violet",
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

const process = [
  "課題と現在の作業フローを整理",
  "最小構成の画面とデータ設計を作成",
  "試作を触りながら改善",
  "公開後の運用と追加改善をサポート",
];

export default function HomePage() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <a href="#" className="brand" aria-label="Arqlium home">
          Arql<span>ium</span>
        </a>
        <nav className="nav-links" aria-label="主要ナビゲーション">
          <a href="#systems">システム</a>
          <a href="#approach">特徴</a>
          <a href="#contact">相談する</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Systems and AI tools for small teams</p>
          <h1>日々の業務を、使いやすいシステムに変える。</h1>
          <p className="hero-lead">
            Arqliumは、レシート読み取りをはじめ、予約管理、在庫管理、AI問い合わせ対応など、
            小さな現場の作業を軽くするWebシステムを企画・開発しています。
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#systems">
              システムを見る
            </a>
            <a className="button secondary" href="https://arqlium-receipt.com">
              レシート読み取りへ
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Arqliumのシステム構成イメージ">
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
              <span className="panel-kicker">Bookings</span>
              <strong>24</strong>
              <p>本日の予約</p>
            </div>
            <div className="visual-panel">
              <span className="panel-kicker">Inventory</span>
              <strong>7</strong>
              <p>発注候補</p>
            </div>
            <div className="visual-panel wide">
              <span className="panel-kicker">AI assistant</span>
              <p>問い合わせ内容を分類し、回答案を作成します。</p>
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
          <h2>単体サービスから、業務全体を支えるシステムへ。</h2>
        </div>
        <p>
          ひとつの便利ツールで終わらせず、必要に応じて周辺業務までつなげられる設計を大切にしています。
          まずは小さく動く形を作り、実際の使い方に合わせて改善していきます。
        </p>
      </section>

      <section className="section" id="systems">
        <div className="section-heading">
          <p className="section-label">Systems</p>
          <h2>提供・構築できるシステム</h2>
          <p>
            現在公開中のサービスと、個別相談から構築できるシステム例です。
            レシート読み取りサービスは、このラインナップの中の経費整理ツールとして提供しています。
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
              <a href={system.href}>
                {system.href.startsWith("http") ? "サービスを見る" : "相談する"}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section strength-band">
        <div className="section-heading compact">
          <p className="section-label">Strength</p>
          <h2>Arqliumが得意なこと</h2>
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

      <section className="section process-section">
        <div className="section-heading compact">
          <p className="section-label">Process</p>
          <h2>相談から公開までの流れ</h2>
        </div>
        <ol className="process-list">
          {process.map((item, index) => (
            <li key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="contact-section" id="contact">
        <div>
          <p className="section-label">Contact</p>
          <h2>まずは小さな課題からご相談ください。</h2>
          <p>
            レシート読み取りサービスの利用、または業務システムの個別構築について、
            現在の作業内容に合わせて整理します。
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
