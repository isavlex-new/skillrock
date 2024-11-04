import Course from  '../models/course.mjs'
import Module from '../models/module.mjs';

export const createCourse = async (req, res) => {
    try {
        const { title, description, instructor } = req.body;
        const course = new Course({ title, description, instructor });
        await course.save();
        const courseWithInstructor = await Course.findById(course._id)
        .populate('instructor')
        .exec();
        res.status(201).json(courseWithInstructor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find()
        .populate('instructor', ['_id', 'first_name', 'last_name'])
        .exec();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id)
        .populate('instructor', ['_id', 'first_name', 'last_name', 'username'])
        .populate({path: 'modules', model: 'Module'})
        .exec()
        res.status(200).json(course);
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
}

export const updateCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, description, instructor } = req.body;
        await Course.updateOne({_id: courseId}, { title, description, instructor: instructor._id });
        const updatedCourse = await Course.findById(courseId)
        .populate('instructor', ['_id', 'first_name', 'last_name', 'username'])
        .populate({path: 'modules', model: 'Module'})
        .exec()
        res.json(updatedCourse);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        await Course.findByIdAndDelete(courseId);
        res.json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
