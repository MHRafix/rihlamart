const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true', // ✅ Only runs analyzer if ANALYZE=true
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			'i.ibb.co.com',
			'cdn-icons-png.flaticon.com',
			'res.cloudinary.com',
		],
	},
};

module.exports = withBundleAnalyzer(nextConfig);
