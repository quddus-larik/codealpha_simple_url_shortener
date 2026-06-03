const shortURLSlug = require("./shortner.handler");
const isURL = require("./url-validator.handler");

function createURL(url) {
    if (isURL(url)) {
        const RandomUrl = shortURLSlug();
        return { url, shortSlug: RandomUrl, message: "success", status: true }
    }
    return { message: "failed: URL may be not a text or valid URL", status: false }
}

module.exports = createURL;
