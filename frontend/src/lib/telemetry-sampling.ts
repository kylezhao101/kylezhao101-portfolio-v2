export type TelemetryReading = { timestamp: number; value: number };

export const DEMO_BUCKET_SECONDS = 30;
export const DEMO_DURATION_SECONDS = 2 * 60 * 60;
// The bucket starting at 1:00:00 selects 1:00:02, missing this spike.
export const DEMO_ANOMALY_TIMESTAMP = 3612;

/** Half-open buckets, targets at bucket starts, earlier timestamps winning ties. */
export function sampleClosestReadings(
  readings: readonly TelemetryReading[],
  bucketSeconds: number,
  start: number,
  end: number,
): TelemetryReading[] {
  if (!Number.isFinite(bucketSeconds) || bucketSeconds <= 0) {
    throw new RangeError("Bucket duration must be positive and finite");
  }
  const selected = new Map<number, TelemetryReading>();
  for (const reading of readings) {
    if (reading.timestamp < start || reading.timestamp >= end) continue;
    const bucket = Math.floor((reading.timestamp - start) / bucketSeconds);
    const target = start + bucket * bucketSeconds;
    const previous = selected.get(bucket);
    const distance = Math.abs(reading.timestamp - target);
    const previousDistance = previous
      ? Math.abs(previous.timestamp - target)
      : Infinity;
    if (
      distance < previousDistance ||
      (distance === previousDistance && previous &&
        reading.timestamp < previous.timestamp)
    ) {
      selected.set(bucket, reading);
    }
  }
  return [...selected.values()].sort((a, b) => a.timestamp - b.timestamp);
}

/** Include already-detected timestamps; this is not an anomaly detector. */
export function retainDetectedReadings(
  sampled: readonly TelemetryReading[],
  raw: readonly TelemetryReading[],
  detectedTimestamps: readonly number[],
): TelemetryReading[] {
  const detected = new Set(detectedTimestamps);
  const result = new Map(sampled.map((reading) => [reading.timestamp, reading]));
  for (const reading of raw) {
    if (detected.has(reading.timestamp)) result.set(reading.timestamp, reading);
  }
  return [...result.values()].sort((a, b) => a.timestamp - b.timestamp);
}

// Continuous ten-second cadence, offset from the thirty-second targets.
export const DEMO_READINGS: readonly TelemetryReading[] = Array.from(
  { length: DEMO_DURATION_SECONDS / 10 },
  (_, index) => {
    const timestamp = 2 + index * 10;
    return { timestamp, value: 24 + (timestamp / DEMO_DURATION_SECONDS) * 1.8 };
  },
);

export const DEMO_ANOMALY_READINGS: readonly TelemetryReading[] =
  DEMO_READINGS.map((reading) => ({
    ...reading,
    value: reading.timestamp === DEMO_ANOMALY_TIMESTAMP ? 31 : reading.value,
  }));
