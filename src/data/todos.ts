import prisma from "@/config/db";

export const getUserTodos = async (userId: string) => {
	return await prisma.todo.findMany({
		where: {
			userId,
		},
	});
};

export const getAllTodos = async () => {
	return await prisma.todo.findMany();
};
