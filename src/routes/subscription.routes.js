import { Router } from 'express';
import { createSubscription, getSubscriptions, getSubscription, updateSubscription, deleteSubscription, getUserSubscriptions, cancelSubscription, getUpcomingRenewals } from '../controllers/subscription.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/upcoming-renewals', authorize, getUpcomingRenewals);
subscriptionRouter.get('/', getSubscriptions);
subscriptionRouter.get('/:id', authorize, getSubscription);
subscriptionRouter.post('/', authorize, createSubscription);
subscriptionRouter.put('/:id', authorize, updateSubscription);
subscriptionRouter.delete('/:id', authorize, deleteSubscription);
subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);
subscriptionRouter.put('/:id/cancel', authorize, cancelSubscription);

export default subscriptionRouter;