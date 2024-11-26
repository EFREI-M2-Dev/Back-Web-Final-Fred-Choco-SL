import PrismaSingleton from "../config/prismaClient";

const prisma = PrismaSingleton.getInstance();

export const getUserProjects = async (userId: number) => {
    return prisma.project.findMany({
        where: {
            users: {
                some: {
                    id: userId, // Vérifie si l'utilisateur fait partie des projets
                },
            },
        },
        include: {
            tasks: true, // Inclut les tâches associées au projet
            tags: true,  // Inclut les étiquettes associées au projet
        },
    });
};

export const createProject = async (name: string, description: string, userId: number) => {
    return prisma.project.create({
        data: {
            name,
            description,
            users: {
                connect: [{ id: userId }], // Connecte l'utilisateur au projet
            },
        },
    });
};

// Service pour mettre à jour un projet
export const updateProject = async (projectId: number, name: string, description: string) => {
    return prisma.project.update({
        where: {
            id: projectId,
        },
        data: {
            name,
            description,
        },
    });
};

// Service pour supprimer un projet
export const deleteProject = async (projectId: number) => {
    return prisma.project.delete({
        where: {
            id: projectId,
        },
    });
};