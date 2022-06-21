const puppeteer = require('puppeteer');

let browser;

async function getImages(question) {
    const page = await browser.newPage();
    await page.goto(`https://images.google.ca/`);
    await page.type("#sbtc > div > div.a4bIc > input", question);
    await (await page.$('#sbtc > div > div.a4bIc > input')).press('Enter');
    await page.waitFor(1500);

    const images = [ await getImage(page, 1), await getImage(page, 2), await getImage(page, 3) ];
    page.close();
    return images;
}

async function getImage(page, i) {
    await page.waitFor("#islrg > div > div");
    await page.waitFor(1000);
    await page.click(`#islrg > div > div:nth-child(${i+1}) img`);
    await page.waitFor("#Sva75c > div > div > div.pxAole > div.tvh9oe.BIB1wf > c-wiz > div > div.OUZ5W > div.zjoqD > div.qdnLaf.isv-id > div > a > img")
    return await page.$eval(`#Sva75c > div > div > div.pxAole > div.tvh9oe.BIB1wf > c-wiz > div > div.OUZ5W > div.zjoqD > div.qdnLaf.isv-id > div > a > img`, (img) => ({
        url: img.src,
        alt: img.alt
    }));
}

async function getYoutube(question) {
    const page = await browser.newPage();
    await page.goto(`https://www.youtube.com/results?search_query=${question}`);
    await page.waitFor("#contents > ytd-video-renderer img");
    // const videos = [ await getVideoData(page, 1), await getVideoData(page, 2), await getVideoData(page, 3) ];
    let todo = 3;
    let counter = 1;
    const videos = [];
    while(Boolean(todo)) {
        try {
            const video = await getVideoData(page, counter);
            videos.push(video)
            todo--;
        } catch(e) {
            console.log(e)
        } finally {
            counter++;
            if (counter == 10) todo = 0;
        }
    }
    page.close();
    return videos;
}

async function getVideoData(page, i) {
    const title = await page.$eval("#contents > ytd-video-renderer:nth-child(" + i + ") h3", (el) => (el.innerText));
    const url = await page.$eval("#contents > ytd-video-renderer:nth-child(" + i + ") a", (el) => (el.href));
    const preview = await page.$eval("#contents > ytd-video-renderer:nth-child(" + i + ") img", (el) => (el.src));
    return { title, url, preview };
}

module.exports = {
    init: async () => {
        browser = await puppeteer.launch({ headless: true });
    },
    getImages: (question) => {
        return getImages(question)
    },
    getVideos: (question) => {
        return getYoutube(question)
    },
    end: () => {
        browser.close();
    }
}