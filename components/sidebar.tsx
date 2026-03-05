import Link from "next/link";
import { LayoutDashboard, Database, BarChart3, LineChart, FileText } from "lucide-react";

export default function Sidebar() {
    return (
        <div className="w-64 h-screen border-r border-[#27272a] bg-[#0c0c0e] flex flex-col pt-8 pb-4">
            {/* Brand */}
            <div className="px-6 mb-8">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-sm bg-[#5c6df2]" />
                    <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#5c6df2] to-[#2bd9a5] text-transparent bg-clip-text">
                        CreditWise
                    </span>
                </Link>
                <p className="text-xs text-muted-foreground mt-2 opacity-80">ML Loan Approval System</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 space-y-1">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-[#18181b] text-white"
                >
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    🏠 Dashboard
                </Link>

                <Link
                    href="/dataset"
                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-[#18181b] hover:text-white"
                >
                    <div className="h-3 w-3 rounded-full bg-slate-700" />
                    📊 Dataset Explorer
                </Link>

                <Link
                    href="/performance"
                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-[#18181b] hover:text-white"
                >
                    <div className="h-3 w-3 rounded-full bg-slate-700" />
                    🧠 Model Performance
                </Link>

                <Link
                    href="/predictor"
                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-[#18181b] hover:text-white"
                >
                    <div className="h-3 w-3 rounded-full bg-slate-700" />
                    🔮 Loan Predictor
                </Link>
            </nav>

            {/* Footer Info */}
            <div className="px-6 space-y-6">
                <div>
                    <h4 className="text-xs font-semibold text-foreground mb-1">Dataset</h4>
                    <p className="text-xs text-muted-foreground">1,000 loan applications</p>
                    <p className="text-xs text-muted-foreground">19 raw features → 28 engineered</p>
                </div>

                <div>
                    <h4 className="text-xs font-semibold text-foreground mb-1">Best Model</h4>
                    <p className="text-xs text-muted-foreground">Logistic Regression · 88.0% Accuracy · F1 80.9%</p>
                </div>
            </div>
        </div>
    );
}
