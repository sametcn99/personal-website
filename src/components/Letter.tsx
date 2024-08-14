export default function Letter({
	children,
	id,
}: {
	children: React.ReactNode
	id: string
}) {
	return (
		<section
			className='print:min-h-screen'
			id={id}
		>
			{children}
		</section>
	)
}
