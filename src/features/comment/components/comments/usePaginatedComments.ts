import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import type { Paginated } from '@/components/Pagination';
import getComments, { type CommentWithUser } from '../../queries/getComments';

function usePaginatedComments(ticketId: string, paginatedComments: Paginated<CommentWithUser>) {
	const queryKey = ['comments', ticketId];
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
		queryKey,
		queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
		initialPageParam: undefined as number | undefined,
		getNextPageParam: (lastPage) =>
			lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
		initialData: {
			pages: [{ list: paginatedComments.list, metadata: paginatedComments.metadata }],
			pageParams: [undefined],
		},
	});

	const comments = data.pages.flatMap((page) => page.list);

	const queryClient = useQueryClient();
	const refresh = () => queryClient.invalidateQueries({ queryKey });

	return { comments, fetchNextPage, hasNextPage, isFetchingNextPage, refresh };
}

export default usePaginatedComments;
