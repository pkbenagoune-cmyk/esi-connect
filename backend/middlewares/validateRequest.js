function validateRequest(req, res, next) {

    const {
        title,
        description,
        subjectId,
        studentId,
        difficulty
    } = req.body;

    if (!title || !title.trim()) {
        return res.status(400).json({
            message: "Title is required."
        });
    }

    if (!description || !description.trim()) {
        return res.status(400).json({
            message: "Description is required."
        });
    }

    if (!subjectId) {
        return res.status(400).json({
            message: "Subject ID is required."
        });
    }

    if (!studentId) {
        return res.status(400).json({
            message: "Student ID is required."
        });
    }

    if (!difficulty) {
        return res.status(400).json({
            message: "Difficulty is required."
        });
    }

    next();

}

module.exports = validateRequest;