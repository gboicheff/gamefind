const models = require('../models').models

function getGameLists(req, res) {
    models.GameList.find({createdBy: req.params.createdBy}).then(response => {
        res.send({lists: response})
    })
}

exports.getGameLists = getGameLists