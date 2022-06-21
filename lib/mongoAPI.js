const mongoose = require('mongoose');
const Page = require("../database/page");
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
        return Page.findByIdAndUpdate(page._id, page);
    }
}