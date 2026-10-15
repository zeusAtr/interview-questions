import { $, browser } from '@wdio/globals';
import { switchToFrame } from '../helpers/frame.helper';
import { stripeData } from '../data/stripe.data';

export enum FrameStripeLocators {
	cardNumber = '#card-number-element iframe',
	expDate = '#card-expiry-element iframe',
	cvc = 'iframe[name^="__privateStripeFrame"]',
}

export interface CardDetails {
	cardNumber: string;
	expDate: string;
	cvc: string;
}

export interface BillingDetails {
	name: string;
	email: string;
	phone: string;
}

export class StripeCardPage {
	private get cardholderName() { return $('#cardholder-name'); }

	private get email() { return $('.billing-input'); }

	private get phone() { return $('#billing-phone'); }

	private get cardNumber() { return $('[name="cardnumber"]'); }

	private get expDate() { return $('[name="exp-date"]'); }

	private get cvc() { return $('[name="cvc"]'); }

	private get createPaymentMethodButton() { return $('#create-pm'); }

	private get latestLogEntry() { return $('#log > div'); }

	public async open(mode = 'split'): Promise<void> {
		await browser.url(`?pk=${stripeData.publishableKey}&mode=${mode}`);
		await $(FrameStripeLocators.cardNumber).waitForDisplayed();
	}

	public async fillBillingDetails(details: BillingDetails): Promise<void> {
		await this.cardholderName.setValue(details.name);
		await this.email.setValue(details.email);
		await this.phone.setValue(details.phone);
	}

	public async fillCardNumber(cardNumber: string): Promise<void> {
		await switchToFrame(FrameStripeLocators.cardNumber);
		await this.cardNumber.click();

		for (const digit of cardNumber) {
			await this.cardNumber.addValue(digit);
			await browser.pause(500);
		}
	}

	public async fillCard(card: CardDetails): Promise<void> {
		await this.fillCardNumber(card.cardNumber);

		await switchToFrame(FrameStripeLocators.expDate);
		await this.expDate.setValue(card.expDate);
		await browser.switchToParentFrame();

		await switchToFrame(FrameStripeLocators.cvc);
		await this.cvc.setValue(card.cvc);
		await browser.switchToParentFrame();
	}

	public async createPaymentMethod(): Promise<string> {
		await this.createPaymentMethodButton.click();
		await browser.pause(1000);

		return this.latestLogEntry.getText();
	}

	public async isFieldInvalid(field: FrameStripeLocators): Promise<boolean> {
		await $('h1').click();
		const className = await $(field).getAttribute('class');

		return className.includes('stripe-field--invalid');
	}
}
