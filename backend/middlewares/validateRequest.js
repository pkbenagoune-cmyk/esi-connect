const subjects = require("../data/subjects.json");

function validateRequest(req, res, next) {

    if (!req.body.title) {
        return res.status(400).json({
            message: "Title is required."
        });
    }

    if (!req.body.description) {
        return res.status(400).json({
            message: "Description is required."
        });
    }

    if (!req.body.subjectId) {
        return res.status(400).json({
            message: "Subject ID is required."
        });
    }

    const subject = subjects.find(subject => {
        return subject.id === Number(req.body.subjectId);
    });

    if (!subject) {
        return res.status(400).json({
            message: "Subject does not exist."
        });
    }

    next();

}

module.exports = validateRequest;