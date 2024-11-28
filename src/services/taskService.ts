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
    statusId: number,
    creatorId: number
) => {
    const maxId = await prisma.task.findFirst({
        where: { projectId },
        orderBy: { id: 'desc' },
        select: { id: true },   
    });

    // Calculer le nouvel ID
    const newId = (maxId?.id || 0) + 1;

    return prisma.task.create({
        data: {
            id: newId,
            projectId,
            name,
            description,
            statusId,
            creatorId,
            assigneeId: creatorId
        },
    });
};

export const updateTask = async (
    projectId: number,
    taskId: number,
    name: string,
    description: string | null,
    statusId: number
) => {
    return prisma.task.update({
        where: {
            projectId_id: { projectId, id: taskId },
        },
        data: {
            name,
            description,
            statusId,
        },
    });
};

export const deleteTask = async (taskId: number, projectId: number,) => {
    return prisma.task.delete({
        where: {
            projectId_id: { projectId, id: taskId },
        },
    });
};

export const getTask = async (taskId: number, projectId: number,) => {
    return prisma.task.findUnique({
        where: {
            projectId_id: { projectId, id: taskId },
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
