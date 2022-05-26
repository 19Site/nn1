/** @type {import('next').NextConfig} */
const nextConfig = {

	reactStrictMode: false,

	async rewrites() {

		return [{

			source: '/api/v1/:path*',

			destination: 'http://localhost:80/api/v1/:path*'
		}];
	}
}

module.exports = nextConfig
