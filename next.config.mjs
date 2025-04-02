import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'

/** @type {import('next').NextConfig} */
const nextConfig = {
	productionBrowserSourceMaps: true,
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const prettyCodeOptions = {
	theme: 'github-dark',
	onVisitLine(node) {
		if (node.children.length === 0) {
			node.children = [{ type: 'text', value: ' ' }]
		}
	},
	keepBackground: true,
}

const withMDX = createMDX({
	options: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
	},
})

export default withMDX(nextConfig)
