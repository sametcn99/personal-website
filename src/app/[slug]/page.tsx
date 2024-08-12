import { socialMediaLinks } from '@/lib/social'
import { getRepo } from '@/utils/utils'
import { notFound, permanentRedirect } from 'next/navigation'

type Params = {
	slug: string
}

export async function generateMetadata({ params }: { params: Params }) {
	const social = socialMediaLinks.find((link) =>
		link.type.includes(params.slug)
	)
	if (social) {
		return {
			title: social.label,
			url: social.link,
		}
	}
	const repo = await getRepo(params.slug)
	if (repo) {
		return {
			title: repo.data.full_name,
			description: repo.data.description,
			image: repo.data.owner.avatar_url,
			url: repo.data.html_url,
		}
	}
}

export default async function Page({ params }: { params: Params }) {
	const social = socialMediaLinks.find((link) =>
		link.type.includes(params.slug)
	)
	social ? permanentRedirect(social?.link.toString()) : null
	const repo = await getRepo(params.slug)
	repo ? permanentRedirect(repo.data.html_url) : null
	notFound()
}
