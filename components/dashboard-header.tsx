export default function DashboardHeader() {
    return (
        <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-black mb-2 tracking-tighter">
                <span className="bg-gradient-to-r from-[#7b8cf6] to-[#b0bbf6] text-transparent bg-clip-text inline-block">
                    Loan Intelligence
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#906df4] to-[#c7b7f1] text-transparent bg-clip-text inline-block">
                    Dashboard
                </span>
            </h1>
            <p className="text-muted-foreground text-sm tracking-wide">
                ML-powered credit risk assessment · Real-time probability scoring
            </p>
        </div>
    );
}
