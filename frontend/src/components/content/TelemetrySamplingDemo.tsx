"use client";

import { useId, useState } from "react";
import {
  DEMO_ANOMALY_READINGS,
  DEMO_ANOMALY_TIMESTAMP,
  DEMO_BUCKET_SECONDS,
  DEMO_DURATION_SECONDS,
  DEMO_READINGS,
  retainDetectedReadings,
  sampleClosestReadings,
  type TelemetryReading,
} from "@/lib/telemetry-sampling";
import styles from "./TelemetrySamplingDemo.module.css";

type Mode = "downsampling" | "anomaly-preservation";

function timeLabel(seconds: number) {
  return [
    String(Math.floor(seconds / 3600)),
    String(Math.floor((seconds % 3600) / 60)).padStart(2, "0"),
    String(seconds % 60).padStart(2, "0"),
  ].join(":");
}

export default function TelemetrySamplingDemo({ mode }: { mode: Mode }) {
  const id = useId();
  const [alternate, setAlternate] = useState(false);
  const [detail, setDetail] = useState(false);
  const anomalyMode = mode === "anomaly-preservation";
  const raw = anomalyMode ? DEMO_ANOMALY_READINGS : DEMO_READINGS;
  const sampled = sampleClosestReadings(
    raw, DEMO_BUCKET_SECONDS, 0, DEMO_DURATION_SECONDS,
  );
  const displayed = anomalyMode && alternate
    ? retainDetectedReadings(sampled, raw, [DEMO_ANOMALY_TIMESTAMP])
    : sampled;
  const choices = anomalyMode
    ? ["Regular downsampling", "Anomalies retained"]
    : ["Raw readings", "Downsampled"];
  const title = "Illustrative graph";
  const detailStart =
    Math.floor(DEMO_ANOMALY_TIMESTAMP / DEMO_BUCKET_SECONDS) *
    DEMO_BUCKET_SECONDS - DEMO_BUCKET_SECONDS;
  const detailEnd = detailStart + DEMO_BUCKET_SECONDS * 4;
  const showSampled = anomalyMode || alternate;

  function chart(width: number, compact: boolean) {
    const start = detail ? detailStart : 0;
    const end = detail ? detailEnd : DEMO_DURATION_SECONDS;
    const left = 43, right = width - 16, top = 45, bottom = 213;
    const x = (timestamp: number) =>
      left + ((timestamp - start) / (end - start)) * (right - left);
    const y = (value: number) =>
      bottom - ((value - 20) / 12) * (bottom - top);
    const visible = (readings: readonly TelemetryReading[]) =>
      readings.filter((reading) =>
        reading.timestamp >= start && reading.timestamp < end);
    const rawVisible = visible(raw);
    const sampledVisible = visible(sampled);
    const displayedVisible = visible(displayed);
    const path = (readings: readonly TelemetryReading[]) =>
      readings.map((reading, index) =>
        `${index === 0 ? "M" : "L"}${x(reading.timestamp)},${y(reading.value)}`
      ).join(" ");
    const tickSeconds = detail ? DEMO_BUCKET_SECONDS : 30 * 60;
    const ticks = Array.from(
      { length: Math.floor((end - start) / tickSeconds) + 1 },
      (_, index) => start + index * tickSeconds,
    );
    // Targets coincide with bucket starts, not midpoints.
    const targets = detail ? ticks.slice(0, -1) : [];
    const suffix = `${detail ? "detail" : "overview"}-${compact ? "mobile" : "desktop"}`;

    return (
      <svg
        className={compact ? styles.mobile : styles.desktop}
        viewBox={`0 0 ${width} 252`}
        role="img"
        aria-labelledby={`${id}-${suffix}-title ${id}-${suffix}-description`}
      >
        <title id={`${id}-${suffix}-title`}>
          {`${title}: ${detail ? "two-minute detail" : "two-hour overview"}, ${choices[Number(alternate)]}`}
        </title>
        <desc id={`${id}-${suffix}-description`}>
          {detail
            ? `Readings arrive every ten seconds. Dashed lines mark targets at the start of each 30-second bucket. Each bucket selects its closest available reading at its original timestamp.`
            : `Two hours of gently increasing telemetry. Sampling reduces ${raw.length} raw readings to ${sampled.length} representative readings.`}
          {anomalyMode && ` A brief spike is ${alternate ? "retained as a diamond" : "missed by regular downsampling"}.`}
        </desc>
        {[20, 24, 28, 32].map((value) => (
          <g key={value}>
            <line x1={left} x2={right} y1={y(value)} y2={y(value)} className={styles.grid} />
            <text x={left - 8} y={y(value) + 4} textAnchor="end">{value}</text>
          </g>
        ))}
        {ticks.map((timestamp, index) => (
          <g key={timestamp}>
            {/* Targets already draw bucket-start lines in the detail view. */}
            {(!detail || timestamp === end) && (
              <line x1={x(timestamp)} x2={x(timestamp)} y1={top} y2={bottom}
                className={detail ? styles.boundary : styles.grid} />
            )}
            {(!compact || index % 2 === 0) && (
              <text x={x(timestamp)} y={233}
                textAnchor={timestamp === end ? "end" : timestamp === start ? "start" : "middle"}>
                {timeLabel(timestamp)}
              </text>
            )}
          </g>
        ))}
        {targets.map((timestamp) => (
          <line key={timestamp} x1={x(timestamp)} x2={x(timestamp)}
            y1={top} y2={bottom} className={styles.target} />
        ))}
        <g className={!showSampled ? styles.rawActive : styles.rawContext}>
          <path d={path(rawVisible)} className={styles.rawLine} />
          {rawVisible.map((reading) => (
            <circle key={reading.timestamp} cx={x(reading.timestamp)} cy={y(reading.value)}
              r={detail ? 2.8 : 1} className={styles.rawPoint} />
          ))}
        </g>
        {showSampled && (
          <>
            <path d={path(displayedVisible)} className={styles.sampleLine} />
            {sampledVisible.map((reading) => (
              <circle key={reading.timestamp} cx={x(reading.timestamp)} cy={y(reading.value)}
                r={detail ? 5 : 1.8} className={styles.selected} />
            ))}
          </>
        )}
        {anomalyMode && alternate && displayedVisible
          .filter((reading) => reading.timestamp === DEMO_ANOMALY_TIMESTAMP)
          .map((reading) => (
            <path key={reading.timestamp}
              d={`M${x(reading.timestamp)},${y(reading.value) - 7} l7,7 -7,7 -7,-7 Z`}
              className={styles.anomaly} />
          ))}
      </svg>
    );
  }

  return (
    <figure className={styles.demo} aria-labelledby={`${id}-heading`}>
      <div className={styles.header}>
        <strong id={`${id}-heading`}>{title}</strong>
        <span className={styles.settings}>
          {raw.length} readings → {sampled.length} sampled · {DEMO_BUCKET_SECONDS}-second buckets
        </span>
      </div>
      <div style={{
        display: "flex", flexWrap: "wrap", alignItems: "center",
        justifyContent: "space-between", gap: "8px 16px"
      }}>
        <div className={styles.controls} role="group" aria-label="Sampling view">
          {choices.map((choice, index) => (
            <button key={choice} type="button" aria-pressed={alternate === Boolean(index)}
              onClick={() => setAlternate(Boolean(index))}>{choice}</button>
          ))}
        </div>
        <div className={styles.controls} role="group" aria-label="Chart scale">
          <button type="button" aria-pressed={!detail} onClick={() => setDetail(false)}>
            2-hour overview
          </button>
          <button type="button" aria-pressed={detail} onClick={() => setDetail(true)}>
            2-minute detail
          </button>
        </div>
      </div>
      {chart(680, false)}
      {chart(340, true)}
      <div className={styles.legend}>
        <span><i className={styles.rawKey} />Raw reading</span>
        <span><i className={styles.selectedKey} />Selected reading</span>
        {detail && <span><i className={styles.targetKey} />Target</span>}
        {anomalyMode && <span><i className={styles.anomalyKey} />Retained anomaly</span>}
      </div>
    </figure>
  );
}
