import { ChevronDownIcon, SlashIcon } from 'lucide-react';
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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';

export type BreadcrumbData = {
	title: string;
	href?: Route;
	dropdown?: { title: string; href: Route }[];
};

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

					if (breadcrumb.dropdown) {
						breadcrumbItem = (
							<DropdownMenu>
								<DropdownMenuTrigger className="flex items-center gap-1">
									{breadcrumb.title}
									<ChevronDownIcon className="size-4" />
								</DropdownMenuTrigger>
								<DropdownMenuContent align="start">
									{breadcrumb.dropdown.map((item) => (
										<DropdownMenuItem key={item.href} asChild>
											<Link href={item.href}>{item.title}</Link>
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
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
