import type { User } from 'better-auth';

type Entity = {
	userId: string;
};

const isOwner = (user: User | undefined, entity: Entity) => {
	return !!user && user.id === entity.userId;
};

export default isOwner;
