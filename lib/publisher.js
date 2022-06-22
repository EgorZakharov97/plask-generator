const RANGE = [7, 12];
const MINUTE = 60000;

class Publisher {
    lastPublished;

    constructor(lastPublished_) {
        this.lastPublished = Date(lastPublished_) > new Date() ? lastPublished_ : Date.now();
    }

    getNextDate() {
        // const delay = randomIntFromInterval(RANGE[0], RANGE[1]) * MINUTE;
        // const publishingDate = this.lastPublished + delay;

        // // Night check
        // if (new Date(this.lastPublished).getHours() > 17) {
        //     let tomorrow = (new Date(this.lastPublished)).setDate((new Date(this.lastPublished)).getDate()+1); //tomorrow
        //     tomorrow = new Date(tomorrow).setHours(9); // at 9 am
        //     tomorrow += delay;
        //     this.lastPublish = tomorrow;

        // } else {
        //     this.lastPublished = publishingDate;
        // }

        // return publishingDate;
        return new Date();
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = Publisher;