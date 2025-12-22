import { SlashIcon } from 'lucide-react';
import type { Route } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from './ui/breadcrumb';

export type BreadcrumbData = { title: string; href?: Route };

type BreadcrumbsProps = {
	breadcrumbs: BreadcrumbData[];
};

const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				{breadcrumbs.map((breadcrumb, index) => {
					let breadcrumbItem = <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>;

					if (breadcrumb.href) {
						breadcrumbItem = (
							<BreadcrumbLink asChild>
								<Link href={breadcrumb.href} className="flex items-center gap-1">
									{breadcrumb.title}
								</Link>
							</BreadcrumbLink>
						);
					}

					return (
						<Fragment key={breadcrumb.title}>
							<BreadcrumbItem>{breadcrumbItem}</BreadcrumbItem>
							{index < breadcrumbs.length - 1 && (
								<BreadcrumbSeparator>
									<SlashIcon className="size-4" />
								</BreadcrumbSeparator>
							)}
						</Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export { Breadcrumbs };
