import { Request, Response, Router } from "express";
import { expressAdapter } from "../../../application/adapters/adapters";
import { createLanguageComposer, deleteLanguageComposer, getLanguageComposer, updateLanguageComposer } from "../../../infrastructure/composers/languages/languages";

const router = Router();

router.post("/api/language/create", async (req: Request, res: Response) => {
    try {
        const adapter = await expressAdapter(req, createLanguageComposer());
        res.status(adapter.statusCode).json(adapter.body);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

/**
 * Endpoint to get language information (requires authentication).
 */
router.get(
    "/api/languages",
    async (req: Request, res: Response) => {
        try {
            const adapter = await expressAdapter(req, getLanguageComposer());
            res.status(adapter.statusCode).json(adapter.body);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }
);

/**
 * Endpoint to update language information (requires authentication).
 */
router.post(
    "/api/language/update/:id",
    async (req: Request, res: Response) => {
        try {
            const adapter = await expressAdapter(req, updateLanguageComposer());
            res.status(adapter.statusCode).json(adapter.body);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }
);

/**
 * Endpoint to delete a language (requires authentication).
 */
router.post(
    "/api/language/delete/:id",
    async (req: Request, res: Response) => {
        try {
            const adapter = await expressAdapter(req, deleteLanguageComposer());
            res.status(adapter.statusCode).json(adapter.body);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }

    }
);

export { router as languageRouter };
