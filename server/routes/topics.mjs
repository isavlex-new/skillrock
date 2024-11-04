import express from 'express';
import { createTopic, getTopics, updateTopic, deleteTopic, getTopicById } from '../controllers/topicsController.mjs';
import checkPermission from '../middleware/permissionMiddleware.mjs';

const router = express.Router();

/**
 * @swagger
 * /topics:
 *   post:
 *     summary: Create a new topic
 *     description: Create a new topic with a title, description, and instructor. Requires the `create_topic` permission.
 *     tags: [Topics]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - module
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               module:
 *                 type: '#/components/schemas/Module'
 *     responses:
 *       200:
 *         description: Topic created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Topic'
 *       500:
 *         description: Internal server error
 */
router.post('/', checkPermission('CREATE_TOPIC'), createTopic);

/**
 * @swagger
 * /topics:
 *   get:
 *     summary: Get all topics
 *     description: Retrieve a list of all available topics, including instructor and modules details.
 *     tags: [Topics]
 *     responses:
 *       200:
 *         description: A list of topics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Topic'
 *       500:
 *         description: Internal server error
 */
router.get('/', checkPermission('READ_TOPIC'), getTopics);


router.get('/:topicId', getTopicById);

/**
 * @swagger
 * /topics/{topicId}:
 *   put:
 *     summary: Update a topic
 *     description: Update the details of an existing topic by its ID. Requires the `update_topic` permission.
 *     tags: [Topics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: topicId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the topic to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               module:
 *                 type: string
 *     responses:
 *       200:
 *         description: Topic updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Topic'
 *       500:
 *         description: Internal server error
 */
router.put('/:topicId', checkPermission('UPDATE_TOPIC'), updateTopic);

/**
 * @swagger
 * /topics/{topicId}:
 *   delete:
 *     summary: Delete a topic
 *     description: Delete a topic by its ID. Requires the `delete_topic` permission.
 *     tags: [Topics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: topicId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the topic to delete
 *     responses:
 *       200:
 *         description: Topic deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.delete('/:topicId', checkPermission('DELETE_TOPIC'), deleteTopic);

export default router;
