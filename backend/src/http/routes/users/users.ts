import { Request, Response, Router } from "express";
import { expressAdapter } from "../../../application/adapters/adapters";
import { createUserComposer, deleteUserComposer, getUserComposer, updateUserComposer } from "../../../infrastructure/composers/users/users";

const router = Router();

router.post("/user/signup", async (req: Request, res: Response) => {
    try {
        const adapter = await expressAdapter(req, createUserComposer());
        res.status(adapter.statusCode).json(adapter.body);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

/**
 * Endpoint to get user information (requires authentication).
 */
router.get(
    "/user",
    async (req: Request, res: Response) => {
        try {
            const adapter = await expressAdapter(req, getUserComposer());
            res.status(adapter.statusCode).json(adapter.body);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }
);

/**
 * Endpoint to update user information (requires authentication).
 */
router.post(
    "/user/update/:id",
    async (req: Request, res: Response) => {
        try {
            const adapter = await expressAdapter(req, updateUserComposer());
            res.status(adapter.statusCode).json(adapter.body);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }
);

/**
 * Endpoint to delete a user (requires authentication).
 */
router.post(
    "/user/delete/:id",
    async (req: Request, res: Response) => {
        try {
            const adapter = await expressAdapter(req, deleteUserComposer());
            res.status(adapter.statusCode).json(adapter.body);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }

    }
);

export { router as userRouter };
