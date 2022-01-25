const moment = require("moment");

let toDateTime = (date) => {
    return moment(date).format('YYYY-MM-DD hh:mm')
}

let toDate = (date) => {
    return moment(date).format('YYYY-MM-DD')
}

module.exports= {
    toDateTime,
    toDate
};