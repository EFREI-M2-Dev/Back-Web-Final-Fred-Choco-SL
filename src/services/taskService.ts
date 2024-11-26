import PrismaSingleton from "../config/prismaClient";

const prisma = PrismaSingleton.getInstance();

export const getTasksByProjectId = async (projectId: number) => {
    return prisma.task.findMany({
        where: {
            projectId,
        },
        include: {
            tags: {
                include: {
                    tag: true, // Inclut les informations des tags associés
                },
            },
            status: true, // Inclut le statut de la tâche
        },
    });
};

export const createTask = async (
    projectId: number,
    name: string,
    description: string | null,
    statusId: number
) => {
    return prisma.task.create({
        data: {
            projectId,
            name,
            description,
            statusId,
            creatorId: 1, // À remplacer par `req.user.id` depuis le contrôleur
        },
    });
};

export const updateTask = async (
    taskId: number,
    name: string,
    description: string | null,
    statusId: number
) => {
    return prisma.task.update({
        where: {
            id: taskId,
        },
        data: {
            name,
            description,
            statusId,
        },
    });
};

export const deleteTask = async (taskId: number) => {
    return prisma.task.delete({
        where: {
            id: taskId,
        },
    });
};

export const getTask = async (taskId: number) => {
    return prisma.task.findUnique({
        where: {
            id: taskId,
        },
        include: {
            tags: {
                include: {
                    tag: true,
                },
            },
            status: true,
        },
    });
};
