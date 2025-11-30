'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { type Ref, useImperativeHandle, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export type DatePickerImperativeHandle = { reset: () => void };

type Props = {
	id: string;
	name: string;
	defaultValue?: string;
	imperativeHandleRef?: Ref<DatePickerImperativeHandle>;
};

export function DatePicker({ id, name, defaultValue, imperativeHandleRef }: Props) {
	const [date, setDate] = useState<Date | undefined>(
		defaultValue ? new Date(defaultValue) : new Date(),
	);
	const [open, setOpen] = useState(false);

	useImperativeHandle(imperativeHandleRef, () => ({
		reset: () => setDate(new Date()),
	}));

	const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';

	const onSelect = (selectedDate: Date | undefined) => {
		setDate(selectedDate);
		setOpen(false);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger id={id} className="w-full" asChild>
				<Button
					variant="outline"
					data-empty={!date}
					className="justify-start text-left font-normal"
				>
					<CalendarIcon />
					{formattedDate}
					<input type="hidden" name={name} value={formattedDate} />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar mode="single" selected={date} onSelect={onSelect} />
			</PopoverContent>
		</Popover>
	);
}
