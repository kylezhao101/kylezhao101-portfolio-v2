import demoStyles from "./TelemetrySamplingDemo.module.css";
import styles from "./FirmwareTasksDiagram.module.css";

type Task = { name: string; jobs: string[] };
type LinkKind = "snapshot" | "queue" | "storage";

const PRODUCERS: Task[] = [
  {
    name: "NimBLE host",
    jobs: ["Finds and connects to the BK805 sensor", "Turns wheel and crank events into speed and cadence", "Runs the 30-second reconnect window"],
  },
  {
    name: "gps_task",
    jobs: ["Reads the module over UART", "Parses position, speed, and UTC time"],
  },
];

const UI: Task = {
  name: "ui_task",
  jobs: [
    "Draws every screen with LVGL and handles touch",
    "Updates ride distance, time, and averages",
    "Takes a ride sample once per second",
    "Asks for a new map area when I move",
  ],
};

const WORKERS: Task[] = [
  {
    name: "fit_writer",
    jobs: ["Writes samples to a temporary file", "Renames it to .fit when the ride ends"],
  },
  {
    name: "map_loader",
    jobs: ["Reads map tiles from the SD card", "Fills whichever 40 KB buffer is not on screen"],
  },
  {
    name: "HTTP server",
    jobs: ["Joins Wi-Fi or opens a setup hotspot", "Lists SD card files for download"],
  },
];

function Card({ task, accent }: { task: Task; accent?: boolean }) {
  return (
    <div className={`${styles.card} ${accent ? styles.accent : ""}`}>
      <div className={styles.cardHeader}>
        <code>{task.name}</code>
      </div>
      <ul>
        {task.jobs.map((job) => (
          <li key={job}>{job}</li>
        ))}
      </ul>
    </div>
  );
}

function Link({ label, kind }: { label: string; kind: LinkKind }) {
  return (
    <div className={`${styles.link} ${styles[kind]}`} aria-hidden="true">
      <span className={styles.line} />
      <span>{label}</span>
    </div>
  );
}

export default function FirmwareTasksDiagram() {
  return (
    <figure
      className={`${demoStyles.demo} ${styles.diagram}`}
      aria-label="Firmware tasks. The Bluetooth host and GPS task keep the latest sensor readings. The UI task reads them, draws the screens, and once per second sends a ride sample through a queue to the FIT writer. The UI task also requests map areas from the map loader through a queue. The FIT writer, map loader, and Wi-Fi file server all use the SD card."
    >
      <div className={demoStyles.header}>
        <strong>Firmware tasks</strong>
        <span className={demoStyles.settings}>Each box is a FreeRTOS task with one job</span>
      </div>

      <div className={styles.row}>
        {PRODUCERS.map((task) => (
          <Card key={task.name} task={task} />
        ))}
      </div>
      <Link kind="snapshot" label="latest readings, copied under a lock" />
      <div className={styles.row}>
        <Card task={UI} accent />
      </div>
      <Link kind="queue" label="queues: ride samples to fit_writer, map requests to map_loader" />
      <div className={styles.row}>
        {WORKERS.map((task) => (
          <Card key={task.name} task={task} />
        ))}
      </div>
      <Link kind="storage" label="reads and writes" />
      <div className={styles.sd}>SD card</div>

      <div className={demoStyles.legend}>
        <span><i className={styles.snapshotKey} />Shared snapshot</span>
        <span><i className={styles.queueKey} />Queue</span>
        <span><i className={styles.storageKey} />SD card access</span>
      </div>
    </figure>
  );
}
