
function isURL(url){
    if(typeof url !== "string"){
        return false;
    }

    const URL_REGEX = /^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9._~:/?#\[\]@!$&'()*+,;=-]*)?$/;

    if(URL_REGEX.test(url)){
        return true;
    }

    return false;
}
module.exports = isURL;