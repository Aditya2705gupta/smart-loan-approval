/** @type {import('next').NextConfig} */
const nextConfig = {
    // Setup API rewrites so that next dev routes /api/predict_ml to local Python server
    // On Vercel this happens automatically with the api/ folder mechanism
    rewrites: async () => {
        return [
            {
                source: "/api/predict_ml",
                destination:
                    process.env.NODE_ENV === "development"
                        ? "http://127.0.0.1:5328/api/predict_ml" // Local FastAPI server port
                        : "/api/predict_ml",
            },
        ];
    },
};

export default nextConfig;
