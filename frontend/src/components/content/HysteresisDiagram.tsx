import demoStyles from "./TelemetrySamplingDemo.module.css";
import styles from "./HysteresisDiagram.module.css";

const THRESHOLDS = [
  { value: 80, label: "Fault trigger", short: "Fault on", className: styles.fault },
  { value: 68, label: "Fault recovery", short: "Fault off", className: `${styles.fault} ${styles.recovery}` },
  { value: 52, label: "Warning trigger", short: "Warn on", className: styles.warning },
  { value: 40, label: "Warning recovery", short: "Warn off", className: `${styles.warning} ${styles.recovery}` },
];

const READINGS = [
  [0, 30], [8, 34], [14, 44], [19, 56], [24, 47], [29, 58], [34, 66], [40, 74],
  [45, 86], [50, 73], [55, 85], [60, 79], [65, 72], [70, 60], [76, 55], [82, 46],
  [88, 34], [94, 29], [100, 27],
];

// Dips below a trigger that stay above its recovery threshold.
const HELD = [[24, 47], [50, 73]];

// Where READINGS cross the threshold that changes state.
const STATES = [
  { start: 0, end: 17.33, label: "Normal", className: styles.normalBand },
  { start: 17.33, end: 42.5, label: "Warning", className: styles.warningBand },
  { start: 42.5, end: 66.67, label: "Fault", className: styles.faultBand },
  { start: 66.67, end: 85, label: "Warning", className: styles.warningBand },
  { start: 85, end: 100, label: "Normal", className: styles.normalBand },
];

const DESCRIPTION =
  "A sensor reading rises past the warning and fault triggers, then falls. " +
  "Dips below a trigger that stay above its recovery threshold do not change state. " +
  "Falling below the fault recovery threshold steps down to Warning, and only " +
  "falling below the warning recovery threshold returns to Normal.";

export default function HysteresisDiagram() {
  function chart(width: number, compact: boolean) {
    const left = compact ? 62 : 118, right = width - 8, top = 12, bottom = 188;
    const bandTop = 200, bandHeight = 26;
    const x = (time: number) => left + (time / 100) * (right - left);
    const y = (value: number) => bottom - ((value - 20) / 75) * (bottom - top);
    const path = READINGS.map(([time, value], index) =>
      `${index === 0 ? "M" : "L"}${x(time)},${y(value)}`
    ).join(" ");

    return (
      <svg
        className={compact ? demoStyles.mobile : demoStyles.desktop}
        viewBox={`0 0 ${width} 230`}
        role="img"
        aria-label={DESCRIPTION}
      >
        {THRESHOLDS.map((threshold) => (
          <g key={threshold.value}>
            <line x1={left} x2={right} y1={y(threshold.value)} y2={y(threshold.value)}
              className={`${styles.threshold} ${threshold.className}`} />
            <text x={left - 8} y={y(threshold.value) + 4} textAnchor="end">
              {compact ? threshold.short : threshold.label}
            </text>
          </g>
        ))}
        {STATES.slice(1).map((state) => (
          <line key={state.start} x1={x(state.start)} x2={x(state.start)}
            y1={top} y2={bandTop} className={demoStyles.target} />
        ))}
        <path d={path} className={demoStyles.sampleLine} />
        {HELD.map(([time, value]) => (
          <circle key={time} cx={x(time)} cy={y(value)} r={5} className={styles.held} />
        ))}
        {STATES.map((state) => (
          <g key={state.start}>
            <rect x={x(state.start) + 1} y={bandTop} rx={4}
              width={x(state.end) - x(state.start) - 2} height={bandHeight}
              className={state.className} />
            <text x={(x(state.start) + x(state.end)) / 2} y={bandTop + 17}
              textAnchor="middle"
              className={`${demoStyles.axisLabel} ${compact ? styles.compactLabel : ""}`}>
              {state.label}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  return (
    <figure className={`${demoStyles.demo} ${styles.diagram}`}>
      <div className={demoStyles.header}>
        <strong>Illustrative graph</strong>
        <span className={demoStyles.settings}>Sensor reading and resulting fault state over time</span>
      </div>
      {chart(680, false)}
      {chart(340, true)}
      <div className={demoStyles.legend}>
        <span><i className={styles.heldKey} />Dips below a trigger but not its recovery threshold, so the state holds</span>
      </div>
    </figure>
  );
}
