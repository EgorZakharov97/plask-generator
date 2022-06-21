const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
    pages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Page",
        }
    ],
    name: {
        type: String,
        index: true,
        unique: true,
    },
    lastModified: {
        type: Date,
        default: Date.now(),
    }
});

TopicSchema.pre("save", (next) => {
    this.lastModified = Date.now();
    next();
});

const Topic = mongoose.model("Topic", TopicSchema);
module.exports = Topic;