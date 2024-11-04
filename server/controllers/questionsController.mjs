import Question from  '../models/question.mjs';
import Topic from '../models/topic.mjs';

export const createQuestion = async (req, res) => {
    try {
        const { text, type, options, explanation, difficulty, topic } = req.body;
        const question = new Question({ text, type, options, explanation, difficulty, topic });
        await question.save();
        await Topic.updateOne({_id: question.topic}, {$push: {questions: question._id}});
        res.status(201).json(question);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getQuestions = async (req, res) => {
    try {
        const { topicId } = req.params;
        const questions = await Question.find({topic: topicId});
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;
        const { text, type, options, explanation, difficulty, topic } = req.body;
        const question = await Question.findByIdAndUpdate(questionId, { text, type, options, explanation, difficulty, topic }, { new: true });
        res.json(question);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;
        const deletedQuestion = await Question.findByIdAndDelete(questionId);
        if (deletedQuestion) {
            await Topic.updateOne({_id: deletedQuestion.topic}, {$pull: {questions: deletedQuestion._id}});
        }
        res.json({ message: 'Question deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
