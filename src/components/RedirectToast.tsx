import { cookies } from 'next/headers';
import ToastTrigger from './ToastTrigger';

async function RedirectToast() {
	const cookieStore = await cookies();
	const message = cookieStore.get('toast')?.value;

	if (!message) return null;

	return <ToastTrigger message={message} />;
}

export default RedirectToast;
