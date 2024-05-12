"use client";

import { deleteTodo } from "@/actions/todos";
import { TrashIcon } from "@/components/icons/DeleteIcon";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

export default function DeleteBtn({ todoId }: { todoId: string }) {
	const [isPending, startTransition] = useTransition();
	return (
		<Button
			className="text-red-500"
			size="icon"
			variant="outline"
			disabled={isPending}
			onClick={() => {
				startTransition(async () => {
					await deleteTodo(todoId);
				});
			}}>
			<TrashIcon className="h-4 w-4" />
			<span className="sr-only">Delete</span>
		</Button>
	);
}
