import {withSentryConfig} from '@sentry/nextjs';
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: false,
  },
  // rewrites: async () => {
  //       return [
  //           // { source: '/api/classify', destination: 'http://127.0.0.1:8000/api/classify' },
  //           // { source : '/api/classify-file', destination: 'http://127.0.0.1:8000/api/classify-file'},
  //           // { source : '/api/docs', destination: 'http://127.0.0.1:8000/api/docs'},
  //           // { source : '/api/healtchecker', destination: 'http://127.0.0.1:8000/api/healthchecker'},
            
  //           {
  //               source: '/api/:path*',
  //               destination: 
  //                   process.env.NODE_ENV === 'development'
  //                       ? 'http://127.0.0.1:8000/api/:path*'
  //                       : '/api/:path*',
  //           },
  //       ];
              
  //   }
}

export default withSentryConfig(nextConfig, {
// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options

// Suppresses source map uploading logs during build
silent: true,
org: "unar-labs-9f",
project: "javascript-nextjs",
}, {
// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Transpiles SDK to be compatible with IE11 (increases bundle size)
transpileClientSDK: true,

// Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
tunnelRoute: "/monitoring",

// Hides source maps from generated client bundles
hideSourceMaps: true,

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,
});