type Params = {
	organizationId: string;
	ticketId: string;
	fileName: string;
	attachmentId: string;
};

const generateS3Key = ({ organizationId, ticketId, fileName, attachmentId }: Params) => {
	return `${organizationId}/${ticketId}/${fileName}-${attachmentId}`;
};

export default generateS3Key;
