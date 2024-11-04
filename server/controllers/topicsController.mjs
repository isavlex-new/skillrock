import Topic from  '../models/topic.mjs';
import Module from '../models/module.mjs';

export const createTopic = async (req, res) => {
    try {
        const { title, content, module } = req.body;
        const topic = new Topic({ title, content, module });
        await topic.save();
        await Module.updateOne({_id: topic.module}, {$push: {topics: topic._id}});
        res.json(topic);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getTopics = async (req, res) => {
    try {
        const topics = await Topic.find().populate('module');
        res.json(topics);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getTopicById = async (req, res) => {
    try {
       const { topicId } = req.params;
       const topic = await Topic.findById(topicId).populate('questions');
       res.status(200).json(topic);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const updateTopic = async (req, res) => {
    try {
        const { topicId } = req.params;
        const { title, content, module } = req.body;
        await Topic.updateOne({_id: topicId}, { title, content, module });
        const topicWithQuestions = await Topic.findById(topicId).populate('questions');
        res.json(topicWithQuestions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteTopic = async (req, res) => {
    try {
        const { topicId } = req.params;
        const deletedTopic = await Topic.findByIdAndDelete(topicId);
        await Module.updateOne({_id: deletedTopic.module}, {$pull: {topics: deletedTopic._id}});
        res.json({ message: 'Topic deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
