import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type FeaturedProjectCardProps = {
    project: {
        slug: string;
        title: string;
        description: string;
        image: string;
        timeframe: string;
        role: string;
        technologies: string[];
        internalRoute: string;
    };
};

export default function FeaturedProjectCard({
    project,
}: FeaturedProjectCardProps) {
    return (
        <Link href={project.internalRoute} className="block w-full">
            <Card className="overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
                <img
                    src={project.image}
                    alt={project.title}
                    className="aspect-video w-full object-cover"
                />

                <CardHeader>
                    <CardTitle className="text-gray-800">{project.title}</CardTitle>

                    <CardDescription>
                        {project.description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex items-start gap-6 justify-between pt-0 flex-col lg:flex-row">
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                            <span
                                key={tech}
                                className="rounded border border-stone-200 px-2 py-1 font-mono text-xs text-stone-500"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <span className="font-mono text-xs text-stone-400">
                        {project.timeframe}
                    </span>
                </CardContent>
            </Card>
        </Link>
    );
}