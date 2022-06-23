const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_SK,
});

const openai = new OpenAIApi(configuration);

let p_coolDown = new Promise((res, rej) => (res(1)));
function resetCooldown() {
    p_coolDown = new Promise((res, rej) => {
        setTimeout(() => (res(1)), [1500]);
    })
}
async function cooldown() {
    await p_coolDown;
    resetCooldown();
}

module.exports = {
    classifyTopic: async (text) => {
        await cooldown();
        const payload = classifyTopicPlaceholder(text);
        const response = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: payload,
            temperature: 0,
            max_tokens: 6,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        let res = response.data.choices[0].text;
        if (res.includes("\n")) res = res.split('\n')[0];
        return res.trim();
    },
    getAnswer: async (question) => {
        await cooldown();
        return getDescription(question)
    },
    summarize: async (article) => {
        await cooldown();
        return summarize(article);
    }
}

async function summarize(article) {
    const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: `Summarize this for a second-grade student:\n\n${article}`,
        temperature: 0.7,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    return response.data.choices[0].text;
}

async function getDescription(question) {
    const response = await openai.createCompletion({
        model: "text-ada-001",
        prompt: `Q:${question}\n\nA:`,
        temperature: 0,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["A:"],
        });
    return (response.data.choices[0].text).replaceAll("\n", "");
}

function classifyTopicPlaceholder(text) {
    return `Topics: Animals
    Topic: Education
    Topic: Beauty & Style
    Topic: Science & Mathematics
    Topic: Health & Medicine
    Topic: Gardening
    Topic: Computers & Internet
    Topic: Environment
    Topic: Society
    Topic: Entertainment & Recreation
    Topic: Home
    Topic: Food & Drink
    Topic: Humanities
    Topic: Computer Electronics
    Topic: Business & Finance
    Topic: Travel
    
    Sentence: ${text}
    Topic:`
}