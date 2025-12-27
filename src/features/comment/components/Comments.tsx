'use client';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import CardCompact from '@/components/CardCompact';
import type { Paginated } from '@/components/Pagination';
import type { CommentWithUser } from '../queries/getComments';
import getComments from '../queries/getComments';
import CommentDeleteButton from './CommentDeleteButton';
import CommentItem from './CommentItem';
import CreateForm from './CreateForm';

type Props = {
	ticketId: string;
	paginatedComments: Paginated<CommentWithUser>;
};

function Comments({ ticketId, paginatedComments }: Props) {
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

	const { ref, inView } = useInView();

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	return (
		<>
			<CardCompact title="Create Comment" description="A new comment will be created">
				<CreateForm ticketId={ticketId} onCreate={refresh} />
			</CardCompact>
			<div className="flex flex-col gap-y-2 ml-8">
				{comments
					.map((comment) => (
						<CommentItem
							key={comment.id}
							comment={comment}
							buttons={[
								<CommentDeleteButton key={comment.id} id={comment.id} onDelete={refresh} />,
							]}
						/>
					))
					.filter(Boolean)}
			</div>
			<div ref={ref}>
				{!hasNextPage && <p className="text-right text-xs italic">No more comments</p>}
			</div>
		</>
	);
}

export default Comments;
