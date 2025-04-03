'use client'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export default function PageBreadcrumb({ path }: { path: string }) {
	// Remove trailing slash and split path
	const pathSegments = path.replace(/\/$/, '').split('/').filter(Boolean)

	if (pathSegments.length === 0) return null

	return (
		<Breadcrumb className='mb-6'>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href='/'>Home</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />

				{pathSegments.map((segment, i) => {
					const isLast = i === pathSegments.length - 1
					const href = `/${pathSegments.slice(0, i + 1).join('/')}`

					return (
						<BreadcrumbItem key={segment}>
							{isLast ? (
								<BreadcrumbPage>{segment.replace(/-/g, ' ')}</BreadcrumbPage>
							) : (
								<BreadcrumbLink href={href}>
									{segment.replace(/-/g, ' ')}
								</BreadcrumbLink>
							)}
							{!isLast && <BreadcrumbSeparator />}
						</BreadcrumbItem>
					)
				})}
			</BreadcrumbList>
		</Breadcrumb>
	)
}
