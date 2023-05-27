import { Router } from "express";
import { alphabetize } from "../controllers/alpha.controller";

const router = Router();

/**
 * Put track
 * @openapi
 * /alpha:
 *   put:
 *     summary: Order alphabetically
 *     description: The json keys are sorted alphabetically.
 *     requestBody:
 *         description: JSON object to be sorted alphabetically
 *         required: true
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               fruit:
 *                 type: string
 *               animal:
 *                 type: string
 *               city-list:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Alpha'
 */
router.put("/alpha", alphabetize);

export default router;
