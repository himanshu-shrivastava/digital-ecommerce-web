/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            new URL('https://firebasestorage.googleapis.com/**'),
            new URL('https://res.cloudinary.com/dm24httno/image/upload/**'),
            new URL('https://img.clerk.com/**'),
        ]
    }
}

export default nextConfig
