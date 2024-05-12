"use client";

import { createTodo } from "@/actions/todos";
import { Textarea } from "@/components/ui/textarea";
import SubmitBtn from "./SubmitBtn";
import { useFormState } from "react-dom";
import { useRef } from "react";

export default function Form() {
	const ref = useRef<HTMLFormElement>(null);
	const [error, action] = useFormState(createTodo, {
		message: "",
	});
	return (
		<form
			action={async (formData) => {
				action(formData);
				ref.current?.reset();
			}}
			className="space-y-4"
			ref={ref}>
			<Textarea
				className="w-full"
				placeholder="Enter your todo item..."
				rows={3}
				name="todo"
				required
			/>
			{error?.message && <p className="text-red-500">{error.message}</p>}
			<SubmitBtn />
		</form>
	);
}
