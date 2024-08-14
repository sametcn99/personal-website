export default function Letter({
	children,
	id,
}: {
	children: React.ReactNode
	id: string
}) {
	return (
		<section
			className='print:h-a4 print:w-a4'
			id={id}
		>
			{children}
		</section>
	)
}
