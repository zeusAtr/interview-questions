export const config: WebdriverIO.Config = {
	runner: 'local',
	specs: ['./specs/**/*.spec.ts'],
	maxInstances: 1,
	capabilities: [{
		browserName: 'chrome',
		'wdio:enforceWebDriverClassic': true,
		'goog:chromeOptions': { args: process.env.HEADED ? [] : ['--headless=new', '--window-size=1280,1000'] },
	}],
	baseUrl: 'https://zeusatr.github.io/interview-questions/stripe-elements/',
	waitforTimeout: 15000,
	framework: 'mocha',
	reporters: ['spec'],
	mochaOpts: { timeout: 60000 },
};
