import User from '../models/user.mjs'; // Import the User model
import Session from '../models/session.mjs';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"; // For hashing passwords

// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, role, password: hashedPassword });
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const refreshToken = async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        res.status(401).json({message: 'unauthorized'});
    }
    const user = jwt.verify(refreshToken, process.env.JWT_REFRESH);
    if (!user) {
        res.status(401).json({message: 'unauthorized'});
    }
    const session = await Session.findOne({user: user.userId});
    if (!session) {
        res.status(401).json({message: 'unauthorized'});
    }
    const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
    const refresh = jwt.sign(user, process.env.JWT_REFRESH, {expiresIn: process.env.JWT_RESRESH_EXPIRES_IN});
    res.cookie('refreshToken', refresh, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
    res.setHeader('Cache-Control', 'no-cache');
    res.status(200).json({token});
}

// Login a user
export const loginUser = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({error: 'Invalid credentials'});
        }

        const token = jwt.sign({
            userId: user._id,
            role: user.role
        }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
        const refresh = jwt.sign({
            userId: user._id,
            role: user.role
        }, process.env.JWT_REFRESH, {expiresIn: process.env.JWT_RESRESH_EXPIRES_IN});
        await Session.create({refreshToken: refresh, user: user._id});
        res.cookie('refreshToken', refresh, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        res.json({token});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

export const logout = async (req, res) => {
    const { refreshToken } = req.cookies;
    await Session.deleteOne({refreshToken});
    res.clearCookie('refreshToken');
    res.status(200).json({message: 'successfully logout'});
}

// Get current user
export const getCurrentUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
        if (!token) return res.status(401).json({error: 'No token provided'});

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) return res.status(404).json({error: 'User not found'});

        res.json(user);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};
