import { Request, Response, Router } from "express";
import { expressAdapter } from "../../../application/adapters/adapters";
import { createWordComposer, deleteWordComposer, getWordComposer, updateWordComposer } from "../../../infrastructure/composers/words/words";

const router = Router();

router.post("/word/create", async (req: Request, res: Response) => {
    try {
        const adapter = await expressAdapter(req, createWordComposer());
        res.status(adapter.statusCode).json(adapter.body);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

/**
 * Endpoint to get word information (requires authentication).
 */
router.get(
    "/word",
    async (req: Request, res: Response) => {
        try {
            const adapter = await expressAdapter(req, getWordComposer());
            res.status(adapter.statusCode).json(adapter.body);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }
);

/**
 * Endpoint to update word information (requires authentication).
 */
router.post(
    "/word/update/:id",
    async (req: Request, res: Response) => {
        try {
            const adapter = await expressAdapter(req, updateWordComposer());
            res.status(adapter.statusCode).json(adapter.body);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }
);

/**
 * Endpoint to delete a word (requires authentication).
 */
router.post(
    "/word/delete/:id",
    async (req: Request, res: Response) => {
        try {
            const adapter = await expressAdapter(req, deleteWordComposer());
            res.status(adapter.statusCode).json(adapter.body);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }

    }
);

export { router as wordRouter };
