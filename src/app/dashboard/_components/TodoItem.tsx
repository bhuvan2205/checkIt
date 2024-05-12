"use client";

import { toggleTodo } from "@/actions/todos";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Todo } from "@prisma/client";
import { useOptimistic, useTransition } from "react";

export default function TodoItem({ todo }: { todo: Todo }) {
	const [optimisticTodo, setOptimisticTodo] = useOptimistic(
		todo,
		(prevState, isCompleted: boolean) => ({
			...prevState,
			completed: isCompleted,
		})
	);
	const { id, completed, title } = optimisticTodo || {};
	const [isPending, startTransition] = useTransition();
	return (
		<div className="flex items-center gap-4 mb-2" key={todo.id}>
			<Checkbox
				defaultChecked={completed}
				id={id}
				disabled={isPending || completed}
				onClick={(e) => {
					setOptimisticTodo(!completed);
					startTransition(async () => {
						await toggleTodo(id, !completed);
					});
				}}
			/>
			<Label
				className={`flex-1 ${completed ? "line-through text-gray-500" : ""}`}
				htmlFor={id}>
				{title}
			</Label>
		</div>
	);
}
