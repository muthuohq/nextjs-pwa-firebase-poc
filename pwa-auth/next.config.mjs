/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';
const nextConfig = {};

export default withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts',
            expiration: {
              maxEntries: 4,
              maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
            },
          },
        },
      ]
}) (nextConfig);
