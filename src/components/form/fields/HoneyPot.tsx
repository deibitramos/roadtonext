import InputText from './InputText';

function HoneyPot() {
	return (
		<div className="absolute -left-2499" aria-hidden="true">
			<InputText name="website" placeholder="Website" tabIndex={-1} autoComplete="off" />
		</div>
	);
}

export default HoneyPot;
