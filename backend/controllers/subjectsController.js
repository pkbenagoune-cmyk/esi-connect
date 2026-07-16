 const subjects = require("../data/subjects");
 function getSubjects(req, res){

    res.json(subjects);

}

module.exports = {

    getSubjects

};