// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       { protocol: 'https', hostname: 'images.unsplash.com' },
//       {
//         protocol: 'https',
//         hostname: 'drive.google.com',
//       },
//     ],
//   },
// };

// module.exports = nextConfig;


/** @type {import('next').NextConfig} */
const remotePatterns = [
  { protocol: 'https', hostname: 'images.unsplash.com' },
  { protocol: 'https', hostname: 'drive.google.com' },
  // Files uploaded through the admin panel are stored in Backblaze B2
  { protocol: 'https', hostname: '**.backblazeb2.com' },
  // Local backend server during development
  {
    protocol: 'http',
    hostname: 'localhost',
    port: '5000',
  },
  {
    protocol: 'http',
    hostname: '127.0.0.1',
    port: '5000',
  },
];

// Optional: a CDN / custom domain in front of the B2 bucket (see backend B2_PUBLIC_URL)
if (process.env.NEXT_PUBLIC_MEDIA_HOSTNAME) {
  remotePatterns.push({ protocol: 'https', hostname: process.env.NEXT_PUBLIC_MEDIA_HOSTNAME });
}

const nextConfig = {
  images: { remotePatterns },
};

module.exports = nextConfig;





