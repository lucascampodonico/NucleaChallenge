import { Router } from "express";
import { flatten } from "../controllers/flatten.controller";

const router = Router();

/**
 * Ruta: /flatten
 * Método: POST
 * Descripción: Aplana cualquier arreglo JSON en el cuerpo de la solicitud.
 * @openapi
 * /flatten:
 *   post:
 *     summary: Flatten any JSON Arrays
 *     description: Flatten any JSON Arrays in the request JSON payload (comma separated)
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
 *              $ref: '#/components/schemas/Flatten'
 */
router.post("/flatten", flatten);

export default router;
