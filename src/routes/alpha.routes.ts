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
 *                 example: 'banana'
 *               animal:
 *                 type: string
 *                 example: 'zebra'
 *               city-list:
 *                   example: ["sunnyvale","san jose"]
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
