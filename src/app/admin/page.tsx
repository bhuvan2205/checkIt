import DeleteIcon, { TrashIcon } from "@/components/icons/DeleteIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { getAllTodos } from "@/data/todos";
import DeleteBtn from "./_components/DeleteBtn";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/route";

export default async function page() {
	const { isAuthenticated, getPermission } = getKindeServerSession();

	if (!(await isAuthenticated())) {
		redirect("/api/auth/login");
	}

	const hasPermission = await getPermission("edit:todo");
	if (!hasPermission?.isGranted) {
		redirect(ROUTES.DASHBOARD);
	}

	const todos = await getAllTodos();

	return (
		<main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
			<div className="max-w-2xl mx-auto space-y-6">
				<div className="space-y-2">
					<h2 className="text-2xl font-bold">All Todos</h2>
					<p className="text-gray-500">Manage your tasks with ease.</p>
				</div>
				<div className="border shadow-sm rounded-md bg-gray-200 dark:bg-gray-950 dark:border-gray-800">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Task</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Assigned To</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{todos?.map((todo) => (
								<TableRow key={todo.id}>
									<TableCell className="font-medium">{todo.title}</TableCell>
									<TableCell>
										<Badge variant="default">
											{todo.completed ? "Completed" : "In Progress"}
										</Badge>
									</TableCell>
									<TableCell>{todo.userId}</TableCell>
									<TableCell className="text-right">
										<Button
											className="mr-2"
											size="icon"
											variant="outline"
											disabled>
											<DeleteIcon className="h-4 w-4" />
											<span className="sr-only">Edit</span>
										</Button>
										<DeleteBtn todoId={todo.id} />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</main>
	);
}
