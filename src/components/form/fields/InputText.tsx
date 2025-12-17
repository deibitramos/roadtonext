import type { InputHTMLAttributes } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

type Props = InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	label?: string;
};

export default function InputText(props: Props) {
	const { name, label, ...inputProps } = props;
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Field>
					{label && <FieldLabel>{label}</FieldLabel>}
					<Input {...field} {...inputProps} value={field.value || ''} />
					<FieldError>{fieldState.error?.message}</FieldError>
				</Field>
			)}
		/>
	);
}
