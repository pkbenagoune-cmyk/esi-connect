const fs = require("fs");
const requests = require("../data/requests.json");
const subjects = require("../data/subjects.json");

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
function createRequest(req, res) {

    // Validate title
    if (!req.body.title) {
        return res.status(400).json({
            message: "Title is required."
        });
    }

    // Validate description
    if (!req.body.description) {
        return res.status(400).json({
            message: "Description is required."
        });
    }

    // Validate subject
    const subject = subjects.find(subject => {
        return subject.id === Number(req.body.subjectId);
    });

    if (!subject) {
        return res.status(400).json({
            message: "Subject does not exist."
        });
    }

    // Validate difficulty
    if (!req.body.difficulty) {
        return res.status(400).json({
            message: "Difficulty is required."
        });
    }

    // Generate ID
    const maxId = requests.reduce((max, request) => {
        return request.id > max ? request.id : max;
    }, 0);

    // Create request
    const newRequest = {
        id: maxId + 1,
        title: req.body.title,
        subjectId: Number(req.body.subjectId),
        difficulty: req.body.difficulty,
        description: req.body.description,
         studentName: req.body.studentName,

        // Business rule
        status: "PENDING"
    };

    requests.push(newRequest);

    fs.writeFileSync(
        "./data/requests.json",
        JSON.stringify(requests, null, 2)
    );

    res.status(201).json(newRequest);
}
function updateRequest(req, res) {

    // 1. Find the request
    const request = requests.find(request => {
        return request.id === Number(req.params.id);
    });

    // 2. Request not found
    if (!request) {
        return res.status(404).json({
            message: "Request not found."
        });
    }

    // 3. Validate title
    if (!req.body.title) {
        return res.status(400).json({
            message: "Title is required."
        });
    }

    // 4. Validate description
    if (!req.body.description) {
        return res.status(400).json({
            message: "Description is required."
        });
    }

    // 5. Validate difficulty
    if (!req.body.difficulty) {
        return res.status(400).json({
            message: "Difficulty is required."
        });
    }

    // 6. Validate student name
    if (!req.body.studentName) {
        return res.status(400).json({
            message: "Student name is required."
        });
    }

    // 7. Validate status
    if (!req.body.status) {
        return res.status(400).json({
            message: "Status is required."
        });
    }

    // 8. Validate subjectId
    const subject = subjects.find(subject => {
        return subject.id === Number(req.body.subjectId);
    });

    if (!subject) {
        return res.status(400).json({
            message: "Subject does not exist."
        });
    }

    // 9. Update the request
    request.title = req.body.title;
    request.subjectId = Number(req.body.subjectId);
    request.difficulty = req.body.difficulty;
    request.description = req.body.description;
    request.studentName = req.body.studentName;
    request.status = req.body.status;

    // 10. Save changes
    fs.writeFileSync(
        "./data/requests.json",
        JSON.stringify(requests, null, 2)
    );

    // 11. Return updated request
    res.json(request);
}
function deleteRequest(req, res) {

    const requestIndex = requests.findIndex(request => {
        return request.id === Number(req.params.id);
    });

    if (requestIndex === -1) {
        return res.status(404).json({
            message: "Request not found."
        });
    }

    requests.splice(requestIndex, 1);
    fs.writeFileSync(
    "./data/requests.json",
    JSON.stringify(requests, null, 2));
    res.status(204).send();


}
module.exports = {

    getRequests,

    getPendingRequests,

    getRequestById,

    createRequest,
     updateRequest,
     deleteRequest

};