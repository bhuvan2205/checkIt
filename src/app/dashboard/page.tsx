import {
	CardTitle,
	CardDescription,
	CardHeader,
	CardContent,
	Card,
} from "@/components/ui/card";
import Form from "./_components/Form";
import { getUserTodos } from "@/data/todos";
import TodoItem from "./_components/TodoItem";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
	const { isAuthenticated, getUser } = getKindeServerSession();
	const user = await getUser();

	if (!(await isAuthenticated())) {
		redirect("/api/auth/login");
	}

	const todos = await getUserTodos(user?.id as string);
	return (
		<main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
			<div className="max-w-2xl mx-auto space-y-6">
				<div className="space-y-2">
					<h2 className="text-2xl font-bold">Todo List</h2>
					<p className="text-gray-500">Manage your tasks with ease.</p>
				</div>
				<Card>
					<CardHeader>
						<CardTitle>Add a new task</CardTitle>
						<CardDescription>
							Use the textarea below to add a new todo item.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Form />
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Your Tasks</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							{todos.map((todo) => (
								<TodoItem key={todo.id} todo={todo} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
