import EchoVisualizer from "@/components/echo-visualizer";
import styles from "./page.module.css";

const cycles = [
  {
    label: "الموجة الأولى",
    title: "نبضة تبدأ من حرفٍ غامض",
    description:
      "تتكرر «اثغ» كأنها كلمة تستيقظ من حلم قديم. نبدأ ببطء، نهمس، ونترك اللون يدور حولها.",
    highlights: ["نبض هادئ", "تكرار ثلاثي", "لون كهرماني"],
  },
  {
    label: "الموجة الثانية",
    title: "الضوء يختلط بالصوت",
    description:
      "نرفع التردد قليلًا. الحروف تتزاحم، الألوان تتحرك، والفراغ يتحول إلى مساحة يمكن لمسها.",
    highlights: ["شغب بصري", "تفاوت في الارتفاع", "مسارات متصادمة"],
  },
  {
    label: "الموجة الثالثة",
    title: "هدوء بعد الانفجار",
    description:
      "نخفّف الإيقاع لنراقب ما تبقى. تذوب الأصداء في الخلفية، لكن أثرها يظل حاضرًا كوميض بعيد.",
    highlights: ["انسحاب تدريجي", "غبار ضوئي", "مساحة للتأمل"],
  },
];

const tags = ["#اثغ", "#echo", "#glitch-poetry", "#90s-dreamwave", "#loop"];

export default function Home() {
  return (
    <div className={styles.screen}>
      <main className={styles.main}>
        <header className={styles.hero}>
          <div className={styles.badge}>اثغ اثغ اثغ</div>
          <h1>
            صدى كلمةٍ بلا معنى، نحاول أن نجعلها نبضًا بصريًا يمكن تدويره ولمسه.
          </h1>
          <p>
            مشروع بصري عبثي يراقب كيف يمكن لحروف صغيرة أن تخلق إيقاعًا، ضوءًا، ومزاجًا. لا
            تبحث عن ترجمة؛ فقط حرك المنزلقات، وتابع كيف تنحرف «اثغ» من الهمس إلى الضجيج.
          </p>
          <ul className={styles.tags}>
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </header>

        <section className={styles.visualSection}>
          <EchoVisualizer phrase="اثغ" />
        </section>

        <section className={styles.timeline}>
          {cycles.map((cycle) => (
            <article key={cycle.label} className={styles.timelineCard}>
              <div className={styles.timelineMeta}>{cycle.label}</div>
              <h2>{cycle.title}</h2>
              <p>{cycle.description}</p>
              <ul>
                {cycle.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className={styles.footerCard}>
          <div>
            <span className={styles.footerBadge}>Ready For Vercel</span>
            <h3>اصنع مساحتك الخاصة من العبث الحروفي.</h3>
          </div>
          <p>
            غيّر اللون، غيّر الإيقاع، واخلق نسخة جديدة من «اثغ» كلما زارك الفضول. هذا كل ما
            تحتاجه لتبدأ موجتك القادمة.
          </p>
        </section>
      </main>
    </div>
  );
}
