"use server";

import prisma from "@/config/db";
import { ROUTES } from "@/constants/route";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createTodo = async (prevState: unknown, formData: FormData) => {
	const { isAuthenticated, getUser } = getKindeServerSession();
	if (!(await isAuthenticated())) {
		redirect("/api/auth/login");
	}
	const user = await getUser();

	const { todo } = Object.fromEntries(formData);

	if (!todo)
		return {
			message: "Todo is required",
		};

	await prisma.todo.create({
		data: {
			title: todo as string,
			userId: user?.id as string,
		},
	});

	revalidatePath("/dashboard");
};

export const toggleTodo = async (todoId: string, status: boolean) => {
	try {
		await prisma.todo.update({
			where: {
				id: todoId,
			},
			data: {
				completed: status,
			},
		});
		revalidatePath(ROUTES.DASHBOARD);
	} catch (error) {
		if (error instanceof Error) {
			console.log("Error:", error.message);
		}
		console.error("Error updating todo:", error);
	}
};

export const deleteTodo = async (todoId: string) => {
	const { isAuthenticated, getPermission } = getKindeServerSession();

	if (!(await isAuthenticated())) {
		redirect("/api/auth/login");
	}

	const hasPermission = await getPermission("edit:todo");
	if (!hasPermission?.isGranted) {
		redirect(ROUTES.DASHBOARD);
	}

	try {
		await prisma.todo.delete({
			where: {
				id: todoId,
			},
		});
		revalidatePath(ROUTES.ADMIN);
	} catch (error) {
		if (error instanceof Error) {
			console.log("Error:", error.message);
		}
		console.error("Error updating todo:", error);
	}
};
