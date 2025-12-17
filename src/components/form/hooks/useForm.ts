import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as libUseForm } from 'react-hook-form';
import type { z } from 'zod/v4';

type Options<T extends z.ZodType> = {
	defaultValues: Partial<z.input<T>>;
	submit: (data: z.output<T>) => Promise<void>;
};

function useForm<T extends z.ZodType>(schema: T, options: Partial<Options<T>> = {}) {
	const { defaultValues = {}, submit = async () => {} } = options;

	const formHook = libUseForm({
		resolver: zodResolver(schema as never), // hack since resolver didn't adapt to zod v4 yet
		defaultValues,
	});

	const onSubmit = formHook.handleSubmit(submit as never);
	return { onSubmit, formHook };
}

export default useForm;

export type HookFormType = ReturnType<typeof useForm>;
