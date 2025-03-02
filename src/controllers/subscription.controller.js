import bcrypt from 'bcryptjs';
import dayjs from 'dayjs';
import Subscription from '../models/subscription.model.js';
import User from '../models/user.model.js';
import { workflowClient } from '../config/upstash.js';
import { SERVER_URL } from '../config/env.js';

export const getSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json({ success: true, data: subscriptions });
    }
    catch (e) {
        next(e);
    }
};

export const getSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            return res.status(404).json({ success: false, message: 'Subscription not found' });
        }
        res.status(200).json({ success: true, data: subscription });
    }
    catch (e) {
        next(e);
    }
};

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({ ...req.body, user: req.user._id, });

        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/sub/workflows/subscription/reminder`,
            body: { subscriptionId: subscription.id, },
            headers: { 'content-type': 'application/json', },
            retries: 0,
        });

        res.status(201).json({ success: true, data: { subscription, workflowRunId } });
    }
    catch (e) {
        next(e);
    }
}

export const updateSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!subscription) {
            return res.status(404).json({ success: false, message: 'Subscription not found' });
        }
        res.status(200).json({ success: true, data: subscription });
    }
    catch (e) {
        next(e);
    }
};

export const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findByIdAndDelete(req.params.id);
        if (!subscription) {
            return res.status(404).json({ success: false, message: 'Subscription not found' });
        }
        res.status(200).json({ success: true, message: 'Subscription deleted successfully' });
    }
    catch (e) {
        next(e);
    }
};

export const getUserSubscriptions = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            const error = new Error('You are not the owner of this account');
            error.status = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id });
        res.status(200).json({ success: true, data: subscriptions });
    }
    catch (e) {
        next(e);
    }
};

export const cancelSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findOne({ _id: req.params.id, user: req.user._id });
        if (!subscription) {
            return res.status(404).json({ success: false, message: 'Subscription not found or unauthorized' });
        }
        subscription.status = 'cancelled';
        await subscription.save();

        res.status(200).json({ success: true, message: 'Subscription canceled successfully' });
    }
    catch (e) {
        next(e);
    }
};

export const getUpcomingRenewals = async (req, res, next) => {
    try {
        const { email, password, days } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid Email' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, message: 'Invalid Password' });
        }

        const daysToCheck = Number(days) || 7;
        if (isNaN(daysToCheck) || daysToCheck <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid day value, it must be a positive number' });
        }

        const today = dayjs().startOf('day');
        const endDate = today.add(daysToCheck, 'day');

        const upcomingRenewals = await Subscription.find({
            user: user._id,
            renewalDate: { $gte: today.toDate(), $lte: endDate.toDate() }
        });

        if (!upcomingRenewals.length) {
            return res.status(200).json({ success: false, message: `No upcoming renewals within ${daysToCheck} days` });
        }

        res.status(200).json({
            success: true,
            message: `These subscriptions will expire within ${daysToCheck} days`,
            data: upcomingRenewals
        });
    }
    catch (e) {
        next(e);
    }
};