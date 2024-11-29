    import { Request, Response } from "express";
    import {
        getTagsByProjectId,
        createTag as addTag,
        updateTag as modifyTag,
        deleteTag as removeTag,
    } from "../services/tagService";

    export const getTags = async (req: Request, res: Response): Promise<void> => {
        try {
            const { projectId } = req.params;

            const tags = await getTagsByProjectId(Number(projectId));
            res.status(200).json(tags);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    };

    export const createTag = async (req: Request, res: Response): Promise<void> => {
        try {
            const { projectId } = req.params;
            const { name } = req.body;

            const tag = await addTag(Number(projectId), name);
            res.status(201).json(tag);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    };

    export const updateTag = async (req: Request, res: Response): Promise<void> => {
        try {
            const { projectId, tagsId } = req.params;
            const { name } = req.body;

            const tag = await modifyTag(Number(projectId), Number(tagsId), name);
            res.status(200).json(tag);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    };

    export const deleteTag = async (req: Request, res: Response): Promise<void> => {
        try {
            const { projectId, tagsId } = req.params;

            await removeTag(Number(projectId), Number(tagsId));
            res.status(200).json({ message: "Tag deleted successfully" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    };
