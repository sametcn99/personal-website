import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'


/** @type {import('next').NextConfig} */
const nextConfig = {
	productionBrowserSourceMaps: true,
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
	// Add markdown plugins here, as desired
	options: {
	  remarkPlugins: [remarkGfm],
	  rehypePlugins: [],
	},
  })

export default withMDX(nextConfig)
