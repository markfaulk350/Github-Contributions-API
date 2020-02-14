const puppeteer = require('puppeteer');

const BASE_URL = 'https://github.com';

const github = {
    browser: null,
    page: null,

    init: async () => {
        github.browser = await puppeteer.launch({
            headless: false     // This allows us to see the browser tab for testing purposes
        });

        github.page = await github.browser.newPage();
    },
    goToUsersGithub: async (userName) => {

        await github.page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
        });

        await github.page.goto(`${BASE_URL}/${userName}`, { waitUntil: 'networkidle2' });
        await github.page.waitFor(5000);
        // debugger;

        // Inside of chrome console we can type a command to see if targeting the elemant works
        // document.querySelector('input[name="username"]')
    }
}

module.exports = github;





// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://example.com');
//   await page.screenshot({path: 'example.png'});

//   await browser.close();
// })();