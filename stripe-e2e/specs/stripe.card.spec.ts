import { $, expect } from '@wdio/globals';
import { StripeCardPage, FrameStripeLocators } from '../pages/stripe.card.page';
import { stripeData } from '../data/stripe.data';

describe('Stripe Elements. Card. Create PaymentMethod.', () => {
	const stripePage = new StripeCardPage();

	beforeEach(async () => {
		await stripePage.open();
	});

	it('PaymentMethod is created for a valid card with billing details', async () => {
		await stripePage.fillBillingDetails(stripeData.billingDetails);
		await stripePage.fillCard(stripeData.cardDetails);

		const result = await stripePage.createPaymentMethod();

		expect($('#log > div')).toHaveText(expect.stringContaining('PaymentMethod created: pm_'));
		expect(result).toContain(`"name": "${stripeData.billingDetails.name}"`);
		expect(result).toContain(`"email": "${stripeData.billingDetails.email}"`);
		expect(result).toContain('"last4": "4242"');
	});

	it('Card number field is marked invalid for a number with a wrong checksum', async () => {
		await stripePage.fillCardNumber(stripeData.cardDetails.invalidCardNumber);

		expect(await stripePage.isFieldInvalid(FrameStripeLocators.cardNumber)).toBe(true);
	});

	it('PaymentMethod is not created when CVC is incomplete', async () => {
		await stripePage.fillCard({ ...stripeData.cardDetails, cvc: '1' });

		const result = await stripePage.createPaymentMethod();

		expect(result).toContain('PaymentMethod');
	});
});
