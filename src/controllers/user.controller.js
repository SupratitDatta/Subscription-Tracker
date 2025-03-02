import User from '../models/user.model.js'

export const createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, message: 'User created successfully', data: user });
    }
    catch (error) {
        next(error);
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, message: 'Users found successfully', data: users });
    }
    catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ success: true, message: 'User found successfully', data: user });
    }
    catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, message: 'User updated successfully', data: user });
    }
    catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, message: 'User deleted successfully', data: user });
    }
    catch (error) {
        next(error);
    }
};