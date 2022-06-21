const mongoose = require('mongoose');
const Page = require("../database/Page");
const Line = require('../database/Line');
const Topic = require("../database/Topic");

module.exports = {
    getNextPage: async () => {
        const res = await Page.findOne({topic: {$exists: false}, "lines.0": {$exists: true}}).populate('lines')
        return res
    },
    getTopic: (name) => {
        return Topic.findOne({name})
    },
    newTopic: (name) => {
        return Topic.create({name})
    },
    saveLine: (line) => {
        return Line.findByIdAndUpdate(line._id, line);
    },
    savePage: (page) => {
        const pg = Page(page);
        pg.markModified('lines');
        return pg.save();
    },
    getLastPublished: async () => {
        const res = await Page.find({topic: "6297dfaadc55c7109c5a7aeb"}).sort({datePublished: -1}).limit(1);
        return res[0].datePublished;
    }
}