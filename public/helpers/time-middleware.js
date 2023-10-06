
const {writeLogFile} = require("../public/helpers/file-handler");
const timeMiddleware = async (req,res, next) => {
    const timestamp = Date.now();

    console.log(timestamp);

    next();
};

module.exports.timeMiddleware = timeMiddleware;