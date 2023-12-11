const puppeteer = require('puppeteer');
const { Eyes, ClassicRunner, Target } = require('@applitools/eyes-puppeteer');


describe('Visual Regression Test', () => {
  let browser : any;
  let page: any;
  let eyes: any;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:4200');


    eyes = new Eyes(new ClassicRunner());
    eyes.setApiKey('Ojjcjo103shhOZ8FcrR99LYPkZkfeKPRQkmNl1snBTmScY110');
  });

  afterAll(async () => {
    await browser.close();
    await eyes.abortIfNotClosed();
  });

  it('should match the screenshot', async () => {
    await eyes.open(page, 'Budget', 'Visual Regression Test');
    await eyes.check('Page', Target.window());
    await eyes.close();
  });
});
