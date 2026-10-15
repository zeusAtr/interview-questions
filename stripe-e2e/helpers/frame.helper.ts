import { $, browser } from '@wdio/globals';

export async function switchToFrame(frame: string): Promise<void> {
	const frameElement = $(frame);

	await frameElement.waitForDisplayed();
	await browser.switchToFrame(await frameElement);
}
