import { Request, Response, Router } from "express";
import { expressAdapter } from "../../../application/adapters/adapters";
import {
    createWordCategoryComposer,
    deleteWordCategoryComposer,
    getWordCategoryComposer,
    updateWordCategoryComposer
} from "../../../infrastructure/composers/word_categories/word_categories";

const router = Router();

router.post("/word_category/create", async (req: Request, res: Response) => {
    try {
        const adapter = await expressAdapter(req, createWordCategoryComposer());
        res.status(adapter.statusCode).json(adapter.body);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

/**
 * Endpoint to get word_category information (requires authentication).
 */
router.get(
    "/word_category",
    async (req: Request, res: Response) => {
        try {
            const adapter = await expressAdapter(req, getWordCategoryComposer());
            res.status(adapter.statusCode).json(adapter.body);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }
);

/**
 * Endpoint to update word_category information (requires authentication).
 */
router.post(
    "/word_category/update/:id",
    async (req: Request, res: Response) => {
        try {
            const adapter = await expressAdapter(req, updateWordCategoryComposer());
            res.status(adapter.statusCode).json(adapter.body);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }
);

/**
 * Endpoint to delete a word_category (requires authentication).
 */
router.post(
    "/word_category/delete/:id",
    async (req: Request, res: Response) => {
        try {
            const adapter = await expressAdapter(req, deleteWordCategoryComposer());
            res.status(adapter.statusCode).json(adapter.body);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }

    }
);

export { router as wordCategoryRouter };
