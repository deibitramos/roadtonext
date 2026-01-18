'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import CardCompact from '@/components/CardCompact';
import type { Paginated } from '@/components/Pagination';
import type { CommentWithUser } from '../../queries/getComments';
import CreateForm from '../CreateForm';
import CommentList from './CommentList';
import usePaginatedComments from './usePaginatedComments';

type Props = {
	ticketId: string;
	paginatedComments: Paginated<CommentWithUser>;
};

function Comments({ ticketId, paginatedComments }: Props) {
	const { comments, fetchNextPage, hasNextPage, isFetchingNextPage, refresh } =
		usePaginatedComments(ticketId, paginatedComments);

	const { ref, inView } = useInView();

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	return (
		<>
			<CardCompact title="Create Comment" description="A new comment will be created">
				<CreateForm ticketId={ticketId} refresh={refresh} />
			</CardCompact>
			<CommentList comments={comments} refresh={refresh} />
			<div ref={ref}>
				{!hasNextPage && <p className="text-right text-xs italic">No more comments</p>}
			</div>
		</>
	);
}

export default Comments;
