import type {NextConfig} from "next";

// ponytail: no turbopack.root, Next infers it; a hardcoded Windows path broke dev on macOS.
const nextConfig: NextConfig = {};

export default nextConfig;
