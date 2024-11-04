import Module from '../models/module.mjs';
import Course from '../models/course.mjs';

export const createModule = async (req, res) => {
    try {
        const { title, content, course } = req.body;
        const module = new Module({ title, content, course });
        await module.save();
        await Course.updateOne({_id: module.course}, {$push: {modules: module._id}});
        res.json(module);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getModules = async (req, res) => {
    try {
        const modules = await Module.find().populate('course');
        res.json(modules);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getModuleById = async (req, res) => {
    try {
        const { moduleId } = req.params;
        const module = await Module.findById(moduleId).populate('topics');
        res.status(200).json(module);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

export const updateModule = async (req, res) => {
    try {
        const { moduleId } = req.params;
        const { title, content, course } = req.body;
        await Module.updateOne({_id: moduleId}, { title, content, course }, { new: true });
        const moduleWithTopics = await Module.findById(moduleId).populate('topics');
        res.json(moduleWithTopics);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteModule = async (req, res) => {
    try {
        const { moduleId } = req.params;
        const deletedModule = await Module.findByIdAndDelete(moduleId);
        await Course.updateOne({_id: deletedModule.course}, {$pull: {modules: moduleId}})
        res.json({ message: 'Module deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
