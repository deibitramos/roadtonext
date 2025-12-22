type Props = { children?: React.ReactNode };

export default function Main({ children }: Props) {
	return (
		<main className="min-h-screen flex-1 overflow-y-auto overflow-x-hidden py-24 px-8 bg-secondary/20 flex flex-col">
			{children}
		</main>
	);
}
