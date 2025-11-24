import { LoaderCircleIcon } from 'lucide-react';

function Spinner() {
	return (
		<div className="flex flex-1 flex-col items-center justify-center self-center">
			<LoaderCircleIcon className="w-16 h-16 animate-spin" />
		</div>
	);
}

export default Spinner;
