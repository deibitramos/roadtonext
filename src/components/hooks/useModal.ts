import { useState } from 'react';

function useModal() {
	const [open, setOpen] = useState(false);

	const openModal = () => setOpen(true);
	const closeModal = () => setOpen(false);
	const onOpenChange = (isOpen: boolean) => setOpen(isOpen);

	return { open, openModal, closeModal, onOpenChange } as const;
}

export default useModal;
