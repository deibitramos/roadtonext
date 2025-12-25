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
		<Card className={`${className}`}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>{children}</CardContent>
			{footer && <CardFooter className="justify-between">{footer}</CardFooter>}
		</Card>
	);
}

export default CardCompact;
