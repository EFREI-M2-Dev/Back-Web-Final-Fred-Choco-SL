import PrismaSingleton from "../config/prismaClient";

const prisma = PrismaSingleton.getInstance();

export const getTagsByProjectId = async (projectId: number) => {
    return prisma.tag.findMany({
        where: {
            projectId,
        },
    });
};

export const createTag = async (projectId: number, name: string) => {
    const maxIdForProject = await prisma.tag.findFirst({
        where: { projectId },
        orderBy: { id: 'desc' }, // Get the tag with the highest id
        select: { id: true },
    });

    const newId = (maxIdForProject?.id || 0) + 1;

    return prisma.tag.create({
        data: {
            id: newId,
            projectId,
            name,
        },
    });
};


export const updateTag = async (projectId: number, tagId: number, name: string) => {
    return prisma.tag.update({
        where: {
            id_projectId: {
                id: tagId,
                projectId,
            },
        },
        data: {
            name,
        },
    });
};

export const deleteTag = async (projectId: number, tagId: number) => {
    return prisma.tag.delete({
        where: {
            id_projectId: {
                id: tagId,
                projectId,
            },
        },
    });
};
