import { useState } from 'react';

function useModal() {
	const [open, setOpen] = useState(false);

	const openModal = () => setOpen(true);
	const closeModal = () => setOpen(false);

	return [open, openModal, closeModal] as const;
}

export default useModal;
