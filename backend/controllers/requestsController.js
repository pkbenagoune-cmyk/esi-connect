const requests = require("../data/requests.json");

function getRequests(req, res) {

    const status = req.query.status;
    const subjectId = req.query.subjectId;

    let filteredRequests = requests;

    if (status) {
        filteredRequests = filteredRequests.filter(request => {
            return request.status === status;
        });
    }

    if (subjectId) {
        filteredRequests = filteredRequests.filter(request => {
            return request.subjectId === Number(subjectId);
        });
    }

    res.json(filteredRequests);
}

function getPendingRequests(req, res) {

    const pendingRequests = requests.filter(request => {
        return request.status === "PENDING";
    });

    res.json(pendingRequests);
}
function getRequestById(req, res) {

    const id = Number(req.params.id);

    const request = requests.find(currentRequest => {
        return currentRequest.id === id;
    });

    if (!request) {

        return res.status(404).json({
            message: "Demande introuvable."
        });

    }

    res.json(request);

}

module.exports = {
    getRequests,
    getPendingRequests,
    getRequestById
};