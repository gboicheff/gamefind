const models = require('../models').models

function serveLink(req, res) {
    const key = req.params.key
    loadGameList(key).then(gameList => {
        if(!gameList) {
            res.send([])
        }
        else{
            const appIDs = gameList['gameAppIds']
            const userIDs = gameList['userIDs']
            const categories = gameList['categories']
            const body = {
                appIDs: appIDs,
                userIDs: userIDs,
                categories: categories
            }
            const resp = {
                body: body
            }
            res.send(resp)
        }
    })
}
function loadGameList(key) {
    return models.GameList.findOne({"key": key})
}
function loadGames(appIds) {
    return models.Game.find().where("appId").in(appIds)
}
exports.serveLink = serveLink;