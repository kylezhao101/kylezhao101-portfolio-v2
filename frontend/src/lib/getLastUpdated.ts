export function getLastUpdated() {
    return process.env.NEXT_PUBLIC_LAST_UPDATED ?? "Unknown";
}