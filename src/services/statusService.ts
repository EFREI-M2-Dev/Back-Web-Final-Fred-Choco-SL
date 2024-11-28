import PrismaSingleton from "../config/prismaClient";

const prisma = PrismaSingleton.getInstance();

export const getStatusesByProjectId = async (projectId: number) => {
    return prisma.status.findMany({
        where: {
            tasks: {
                some: {
                    projectId,
                },
            },
        },
    });
};

export const createStatus = async (projectId: number, name: string) => {
    return prisma.status.create({
        data: {
            name,
        },
    });
};

export const updateStatus = async (projectId: number, statusId: number, name: string) => {
    return prisma.status.update({
        where: {
            id: statusId,
        },
        data: {
            name,
        },
    });
};

export const deleteStatus = async (projectId: number, statusId: number) => {
    return prisma.status.delete({
        where: {
            id: statusId,
        },
    });
};


export const getAllStatuses = async () => {
    return prisma.status.findMany();
}