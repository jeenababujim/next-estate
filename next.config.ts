import type { NextConfig } from "next";

const nextConfig: NextConfig = {
images:{
  remotePatterns:[
    {
    protocol:'https',
    hostname:'voall8bsxj3egbqx.public.blob.vercel-storage.com',
    port:"",
    pathname:'/**'
    
    }
  ]
}
};

export default nextConfig;
// https://voall8bsxj3egbqx.public.blob.vercel-storage.com