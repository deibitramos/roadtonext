import type { PropsWithChildren, ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

type Props = {
	title: string;
	description: string;
	className?: string;
	footer?: ReactNode;
};

function CardCompact(props: PropsWithChildren<Props>) {
	const { title, description, className, footer, children } = props;
	return (
		<Card className={`w-full max-w-[420px] self-center ${className}`}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>{children}</CardContent>
			{footer && <CardFooter>{footer}</CardFooter>}
		</Card>
	);
}

export default CardCompact;
