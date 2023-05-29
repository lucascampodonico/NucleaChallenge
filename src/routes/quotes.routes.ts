import { Router } from "express";
import { generateQuote, getQuotes } from "../controllers/quotes.controller";

const router = Router();

/**
 * Ruta: /quote
 * Método: POST
 * Descripción: Genera una cita aleatoria.
 * @swagger
 * /quote:
 *   post:
 *     summary: Generate Quote
 *     description: Generate random quote
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Quote'
 */
router.post("/quote", generateQuote);

/**
 * Ruta: /quotes
 * Método: GET
 * Descripción: Obtiene todas las citas disponibles.
 * @swagger
 * /quotes:
 *   get:
 *     summary: Get all quotes
 *     description: Returns all quotes
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Author A:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Quotes'
 *                 Author B:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Quotes'
 */
router.get("/quotes", getQuotes);

export default router;
