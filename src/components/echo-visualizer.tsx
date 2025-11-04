"use client";

import { useMemo, useState } from "react";
import styles from "./echo-visualizer.module.css";

type EchoVisualizerProps = {
  phrase: string;
  palette?: string[];
};

const defaultPalette = ["#f97316", "#ec4899", "#6366f1", "#22d3ee", "#a855f7"];

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export default function EchoVisualizer({
  phrase,
  palette = defaultPalette,
}: EchoVisualizerProps) {
  const [density, setDensity] = useState(12);
  const [flutter, setFlutter] = useState(0.35);
  const [pulse, setPulse] = useState(0.65);

  const glyphs = useMemo(() => {
    const rows = 6;
    const total = rows * density;

    return Array.from({ length: total }).map((_, index) => {
      const seed = (index + 1) * (density + 3.17) * (flutter + 1.1);
      const column = index % density;
      const row = Math.floor(index / density);
      const normalizedColumn =
        density > 1 ? column / (density - 1) : column / density;
      const normalizedRow = rows > 1 ? row / (rows - 1) : row / rows;
      const jitterX = (pseudoRandom(seed) - 0.5) * 24 * flutter;
      const jitterY = (pseudoRandom(seed * 1.7) - 0.5) * 22 * flutter;
      const rotate = (pseudoRandom(seed * 2.1) - 0.5) * 120 * flutter;
      const scale =
        0.65 + pseudoRandom(seed * 3.3) * (1.1 + flutter * 0.75) + pulse * 0.15;
      const opacity = 0.35 + pseudoRandom(seed * 4.7) * 0.55 + pulse * 0.2;

      return {
        word: phrase,
        color: palette[index % palette.length] ?? palette[0],
        left: normalizedColumn * 100 + jitterX,
        top: normalizedRow * 100 + jitterY,
        rotate,
        scale,
        opacity: Math.min(opacity, 1),
      };
    });
  }, [density, flutter, pulse, palette, phrase]);

  return (
    <div className={styles.panel}>
      <div className={styles.toolbar}>
        <div className={styles.labelGroup}>
          <span className={styles.labelHeading}>تشكيل الصدى</span>
          <span className={styles.labelSub}>حرّك المنزلقات وشاهد الكلمة تتنفس</span>
        </div>
        <div className={styles.controls}>
          <label className={styles.control}>
            <span>كثافة</span>
            <input
              type="range"
              min={6}
              max={24}
              value={density}
              onChange={(event) => setDensity(Number(event.target.value))}
            />
            <span className={styles.value}>{density}</span>
          </label>
          <label className={styles.control}>
            <span>تموّج</span>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(flutter * 100)}
              onChange={(event) => setFlutter(Number(event.target.value) / 100)}
            />
            <span className={styles.value}>{Math.round(flutter * 100)}%</span>
          </label>
          <label className={styles.control}>
            <span>نبض</span>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(pulse * 100)}
              onChange={(event) => setPulse(Number(event.target.value) / 100)}
            />
            <span className={styles.value}>{Math.round(pulse * 100)}%</span>
          </label>
        </div>
      </div>

      <div className={styles.canvas}>
        {glyphs.map((glyph, index) => (
          <span
            key={`${glyph.word}-${index}`}
            className={styles.glyph}
            style={{
              left: `${glyph.left}%`,
              top: `${glyph.top}%`,
              transform: `translate(-50%, -50%) rotate(${glyph.rotate}deg) scale(${glyph.scale})`,
              color: glyph.color,
              opacity: glyph.opacity,
            }}
            aria-hidden="true"
          >
            {glyph.word}
          </span>
        ))}
        <div className={styles.core}>
          <span className={styles.coreAccent}>اثغ</span>
          <p>أصداء كلمة بلا معنى، لكنها تحكي إيقاع اليوم.</p>
        </div>
      </div>
    </div>
  );
}
