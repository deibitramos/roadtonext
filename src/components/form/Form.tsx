import type { PropsWithChildren } from 'react';
import { FormProvider } from 'react-hook-form';
import type { HookFormType } from './hooks/useForm';

type Props = {
	form: HookFormType;
};

function Form({ form, children }: PropsWithChildren<Props>) {
	const { onSubmit, formHook } = form;
	return (
		<FormProvider {...formHook}>
			<form onSubmit={onSubmit}>{children}</form>
		</FormProvider>
	);
}

export default Form;
