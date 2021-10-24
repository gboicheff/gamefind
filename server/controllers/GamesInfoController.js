const models = require('../models').models

function getGamesInfo(req, res) {
    const appIDs = req.body.appIDs
    loadGames(appIDs).then(games => {
        const body = {
            games: games,
        }
        const resp = {
            body: body
        }
        res.send(resp)
    })
}

function loadGames(appIDs) {
    return models.Game.find().where("appId").in(appIDs)
}

exports.getGamesInfo = getGamesInfo