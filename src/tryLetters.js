import puppeteer from 'puppeteer'

export async function tryLetters(word) {
    let row = []
    const browser = await puppeteer.launch({
        headless: true,
        incognito: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox',]
    });
    const page = await browser.newPage();
    const url = 'https://www.powerlanguage.co.uk/wordle/'
    await page.goto(url);
    await page.click('body')
    await page.keyboard.type(word);
    await page.keyboard.press('Enter');
    row = await page.evaluate(async () => {
        const characters = document.querySelector("body > game-app").shadowRoot.querySelector("#board > game-row:nth-child(1)").shadowRoot.querySelector("div").children;
        return characters;
    })
    await browser.close();
    return row;
}
