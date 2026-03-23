import { Router, raw } from 'express';
import { validate } from '../middleware/validate';
import { paymentLimiter } from '../middleware/rateLimiter';
import { createPaymentIntentSchema } from '../schemas/booking.schema';
import { createCheckoutSession, webhook } from '../controllers/payments.controller';

const router = Router();

// Create Stripe Checkout Session
router.post('/create-checkout-session', paymentLimiter, validate(createPaymentIntentSchema), createCheckoutSession);

// Stripe Webhook (needs raw body)
router.post('/webhook', raw({ type: 'application/json' }), webhook);

export default router;
