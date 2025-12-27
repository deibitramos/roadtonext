import { Skeleton } from './ui/skeleton';

function SkeletonLoader() {
	return (
		<div className="flex flex-col gap-y-4">
			<Skeleton className="h-62.5 w-full" />
			<Skeleton className="h-20 ml-8" />
			<Skeleton className="h-20 ml-8" />
		</div>
	);
}

export default SkeletonLoader;
