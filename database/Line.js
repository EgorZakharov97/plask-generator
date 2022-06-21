const mongoose = require('mongoose');

const LineSchema = new mongoose.Schema({
    url: {
        type: String,
        index: true,
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
        index: true,
    },
    certainty: {
        type: Number,
        index: true,
    },
    text: {
        type: String,
        required: true,
    },
    lastModified: {
        type: Date,
        default: Date.now(),
    },
    description: {
        type: String
    },
    videos: [
        {
            title: {
                type: String,
                required: true,
            },
            preview: {
                type: String,
            },
            url: {
                type: String,
                required: true,
            }
        }
    ],
    images: [
        {
            url: {
                type: String,
                required: true,
            },
            alt: {
                type: String,
                required: true,
            }
        }
    ]
});

LineSchema.pre("save", (next) => {
    this.lastModified = Date.now();
    next();
});

const Line = mongoose.model("Line", LineSchema);
module.exports = Line;