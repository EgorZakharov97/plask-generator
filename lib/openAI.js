const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_SK,
});

const openai = new OpenAIApi(configuration);

let coolDown = new Promise((res, rej) => (res(1)));
function resetCooldown() {
    coolDown = new Promise((res, rej) => {
        setTimeout(() => (res(1)), [1500]);
    })
}

module.exports = {
    classifyTopic: async (text) => {
        const payload = classifyTopicPlaceholder(text);
        await coolDown;
        resetCooldown();
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
    getAnswer: (question) => {
        return getDescription(question)
    }
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