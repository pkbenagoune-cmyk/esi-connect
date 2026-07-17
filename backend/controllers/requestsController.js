const requests = require("../data/requests.json");

function getRequests(req, res) {

    res.json(requests);

}

module.exports = {

    getRequests

};