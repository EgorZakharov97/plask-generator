
const mongoose = require('mongoose');
const PageSchema = new mongoose.Schema({
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
        index: true,
    },
    lines: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Line",
        }
    ],
    url: {
        type: String,
        index: true,
    },
    lastModified: {
        type: Date,
        default: Date.now(),
    },
    datePublished: {
        type: Date,
    },
    href: {
        type: String,
        index: true,
    }
});

PageSchema.pre("save", (next) => {
    this.lastModified = Date.now();
    next();
});

const Page = mongoose.model("Page", PageSchema);
module.exports = Page;