import prisma from "@/config/db";

export const getUserTodos = async (userId: string) => {
	return await prisma.todo.findMany({
		where: {
			userId,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
};

export const getAllTodos = async () => {
	return await prisma.todo.findMany();
};
