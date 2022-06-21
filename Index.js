require('dotenv').config();
const mongoose = require("mongoose");
const Line = require('./database/Line');
const { getNextPage, getTopic, newTopic, savePage, saveLine, getLastPublished } = require('./lib/mongoAPI');
const { classifyTopic, getAnswer } = require('./lib/openAI');
const Media = require('./lib/media');
const cron = require('node-cron');
const Publisher = require('./lib/publisher');
let logger;
let publisher;

// cron.schedule('0 0 10 * * *', main);
main()

async function main() {
    mongoose.connect(process.env.MONGO);
    logger = require('./lib/logger');
    let counter = process.argv[2] || 10;

    publisher = new Publisher(await getLastPublished());

    while(counter) {
        const res = await processLine();
        if (res) counter--;
    }
}

async function processLine() {
    const nextPage = await getNextPage();
    const topicName = await classifyTopic(nextPage.lines[0].text);
    let topic = await getTopic(topicName);
    if (!topic) {
        topic = await newTopic(topicName);
        logger.info(`New topic: ${topic._id}, ${topicName}`);
    }

    nextPage.href = gethref(nextPage.lines[0].text);
    nextPage.title = nextPage.lines[0].text;
    nextPage.topic = topic;
    nextPage.datePublished = publisher.getNextDate();

    if (topicName !== "Business & Finance") {
        logger.info(`New topic is ${topicName}, not interested`);
        await savePage(nextPage);
        logger.info(`Saved ${nextPage._id}`)
        return false;
    }

    // logger.info('Got Business and finance');

    await Media.init();
    for(let i=0; i<nextPage.lines.length; i++){
        const line = nextPage.lines[i];
        // logger.info(`${line._id}: ${line.text}`);
        const description = await getAnswer(line.text);

        const images = await Media.getImages(line.text);
        const videos = await Media.getVideos(line.text);

        line.description = description;
        line.images = images;
        line.videos = videos;
        line.topic = topic;

        console.log("before")
        console.log(line)

        Line(line).save().then((err, res) => {
            if (err) console.log(err)
            if (res) {
                console.log('after')
                console.log(res)
            }
        })
    }

    Media.end();
    await savePage(nextPage);
    return true;
}

function gethref(text) {
    return text
    .substring(0, 100)
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .trim()
    .replaceAll(' ', '-')
    .toLowerCase()
}