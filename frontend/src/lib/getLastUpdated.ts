import { execSync } from "child_process";

export function getLastUpdated() {
    try {
        return execSync("git log -1 --format=%cs").toString().trim();
    } catch {
        return "Unknown";
    }
}