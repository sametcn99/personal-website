import { socialMediaLinks } from '@/lib/social'
import { getRepo } from '@/utils/utils'
import { notFound, permanentRedirect } from 'next/navigation'
import { Metadata } from 'next'

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const social = socialMediaLinks.find((link) =>
        link.type.includes(slug)
    )
    if (social) {
        return {
            title: social.label,
            openGraph: {
                url: social.link.toString()
            }
        }
    }
    const repo = await getRepo(slug)
    if (repo) {
        return {
            title: repo.data.full_name,
            description: repo.data.description,
            openGraph: {
                images: [repo.data.owner.avatar_url],
                url: repo.data.html_url
            }
        }
    }
    return {}
}

export default async function Page({ params }: Props) {
    const { slug } = await params
    const social = socialMediaLinks.find((link) =>
        link.type.includes(slug)
    )
    if (social) {
        permanentRedirect(social.link.toString())
    }
    const repo = await getRepo(slug)
    if (repo) {
        permanentRedirect(repo.data.html_url)
    }
    notFound()
}
