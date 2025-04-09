import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import { DialogTitle } from '@/components/ui/dialog'
import { FolderIcon } from 'lucide-react'

const srOnlyStyles = 'sr-only'

interface Link {
	href: string
	title: string
}

interface CommandDialogProps {
	open: boolean
	setOpen: (open: boolean) => void
	searchQuery: string
	setSearchQuery: (searchQuery: string) => void
	filteredCategories: Record<string, Link[]>
}

const CommandDialogComponent: React.FC<CommandDialogProps> = ({
	open,
	setOpen,
	searchQuery,
	setSearchQuery,
	filteredCategories,
}) => {
	return (
		<CommandDialog
			open={open}
			onOpenChange={(isOpen) => {
				setOpen(isOpen)
				if (!isOpen) {
					setSearchQuery('')
				}
			}}
		>
				<DialogTitle className={srOnlyStyles}>Search snippets</DialogTitle>
			<CommandInput
				placeholder='Type to search for snippets...'
				value={searchQuery}
				onValueChange={setSearchQuery}
			/>
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				{Object.entries(filteredCategories).map(([category, links]) => (
					<CommandGroup
						key={category}
						heading={category}
					>
						{links.map((link: Link) => (
							<CommandItem
								key={link.href}
								value={link.title}
								onSelect={() => {
									window.location.href = link.href
									setOpen(false)
								}}
							>
								<FolderIcon className='mr-2 h-4 w-4' />
								{link.title}
							</CommandItem>
						))}
					</CommandGroup>
				))}
			</CommandList>
		</CommandDialog>
	)
}

export default CommandDialogComponent
