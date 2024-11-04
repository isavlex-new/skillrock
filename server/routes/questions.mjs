import express from 'express';
import { createQuestion, getQuestions, updateQuestion, deleteQuestion } from '../controllers/questionsController.mjs';
import checkPermission from "../middleware/permissionMiddleware.mjs";

const router = express.Router();

/**
 * @swagger
 * /questions/{topicId}:
 *   get:
 *     summary: Get all questions
 *     description: Retrieve a list of all questions.
 *     parameters:
 *       - in: path
 *         name: topicId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the topic
 *         example: "64abc1234def"
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: A list of questions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 *       500:
 *         description: Internal server error
 */
router.get('/:topicId', checkPermission('READ_QUESTION'), getQuestions);

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Create a new question
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Question'
 *     responses:
 *       201:
 *         description: The created question
 */
router.post('/', checkPermission('CREATE_QUESTION'), createQuestion);

/**
 * @swagger
 * /questions/{id}:
 *   put:
 *     summary: Update a question
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Question ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Question'
 *     responses:
 *       200:
 *         description: The updated question
 */
router.put('/:questionId', checkPermission('UPDATE_QUESTION'), updateQuestion);

/**
 * @swagger
 * /questions/{id}:
 *   delete:
 *     summary: Delete a question
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Question ID
 *     responses:
 *       200:
 *         description: The deleted question
 */
router.delete('/:questionId', checkPermission('DELETE_QUESTION'), deleteQuestion);

export default router;
