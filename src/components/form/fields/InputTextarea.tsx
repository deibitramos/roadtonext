import type { TextareaHTMLAttributes } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
	name: string;
	label?: string;
};

export default function InputTextarea(props: Props) {
	const { name, label, ...textareaProps } = props;
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Field>
					{label && <FieldLabel>{label}</FieldLabel>}
					<Textarea {...field} {...textareaProps} value={field.value || ''} />
					<FieldError>{fieldState.error?.message}</FieldError>
				</Field>
			)}
		/>
	);
}
