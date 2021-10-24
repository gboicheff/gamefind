const axios = require('axios');
const randomColor = require('randomcolor');

function getPlayerInfo(req, res) {
    let userIDs = req.body.userIDs;
    let url = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0001/?key=' + process.env.STEAM_API_KEY + '&steamids=' + userIDs.join(",")
    axios.get(url).then(response => {
        let players = []
        const colors = randomColor({count: response.data['response']['players']['player'].length})
        let index = 0
        response.data['response']['players']['player'].forEach(user => {
            players.push({
                value: user['steamid'],
                icon: user['avatar'],
                name: user['personaname'],
                color: colors[index]
            })
            index++
        })
        res.send(players)
    }).catch(error => {
        res.send([])
    })
}
exports.getPlayerInfo = getPlayerInfo;