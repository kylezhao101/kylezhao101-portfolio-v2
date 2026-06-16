import { config } from "@/config/config";
import { Status, StatusIndicator } from "@/components/ui/status";



export default function ProfileMetaTable() {
    const rows: [string, React.ReactNode][] = [
        ["discipline", "product + systems engineering"],
        ["also", "interface design · visual systems · illustration"],
        [
            "status",
            <Status status="open-to-work" variant="outline" >
                <StatusIndicator />
                <span className="text-gray-700 text-xs font-normal">{config.status}</span>
            </Status>,
        ],
    ];

    return (
        <div className="w-full max-w-full border-t text-xs">
            {rows.map(([label, value]) => (
                <div
                    key={label}
                    className="grid grid-cols-[110px_1fr] border-b py-2"
                >
                    <span className="text-gray-700">
                        {label}
                    </span>

                    <div className="flex justify-end text-gray-700 text-xs">
                        {value}
                    </div>
                </div>
            ))}
        </div>
    );
}