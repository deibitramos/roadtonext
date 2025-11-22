import clsx from "clsx";
import Link from "next/link";
import { initialTickets } from "@/data";
import { CheckIcon, DocumentIcon, PencilIcon } from "@/icons";

const TICKET_ICONS = {
	OPEN: <DocumentIcon />,
	IN_PROGRESS: <PencilIcon />,
	DONE: <CheckIcon />,
};

export default function TicketsPage() {
	return (
		<div className="flex flex-1 flex-col gap-y-8">
			<div>
				<h2 className="text-3xl font-bold tracking-tight">Tickets Page</h2>
				<p className="text-sm text-muted-foreground">Your place to manage tickets</p>
			</div>
			<div className="flex flex-1 flex-col items-center gap-y-4 animate-fade-from-top">
				{initialTickets.map((ticket) => (
					<div key={ticket.id} className="w-full max-w-[420px] p-4 border border-slate-100 rounded">
						<div>{TICKET_ICONS[ticket.status]}</div>
						<h3 className="text-lg font-semibold truncate">{ticket.title}</h3>
						<p
							className={clsx("text-sm truncate text-slate-500", {
								"line-through": ticket.status === "DONE",
							})}
						>
							{ticket.content}
						</p>
						<Link href={`/tickets/${ticket.id}`} className="text-sm underline">
							View Ticket
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
