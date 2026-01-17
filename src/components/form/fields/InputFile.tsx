import type { ChangeEvent, InputHTMLAttributes } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> & {
	name: string;
	label?: string;
};

const createFileChangeHandler =
	(onChange: (files: FileList) => void) => (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) onChange(files);
	};

export default function InputFile(props: Props) {
	const { name, label, ...inputProps } = props;
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value: _, ...restField }, fieldState }) => (
				<Field>
					{label && <FieldLabel>{label}</FieldLabel>}
					<Input
						{...inputProps}
						{...restField}
						type="file"
						onChange={createFileChangeHandler(onChange)}
					/>
					<FieldError>{fieldState.error?.message}</FieldError>
				</Field>
			)}
		/>
	);
}
