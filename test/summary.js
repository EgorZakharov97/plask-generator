const media = require('../lib/media');
const question = "What is the best way to travel?";

( async function() {
    await media.init();
    const article = await media.getArticleByQuestion(question);
    console.log(article);
    media.end();
})()