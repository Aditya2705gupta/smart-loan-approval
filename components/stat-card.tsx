import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
    title: string;
    value: string | ReactNode;
    subtitle: string;
    className?: string;
    valueClassName?: string;
}

export default function StatCard({ title, value, subtitle, className, valueClassName }: StatCardProps) {
    return (
        <div className={cn("p-6 rounded-2xl border border-[#27272a] bg-[#18181b] flex flex-col justify-between", className)}>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                {title}
            </h3>
            <div>
                <div className={cn("text-4xl font-bold mb-1 text-white", valueClassName)}>
                    {value}
                </div>
                <p className="text-sm text-muted-foreground">
                    {subtitle}
                </p>
            </div>
        </div>
    );
}
