type UserWithId = {
	id: string;
};

type Entity = {
	userId: string | null;
};

const isOwner = (user: UserWithId | undefined, entity: Entity) => {
	return !!user && user.id === entity.userId;
};

export default isOwner;
