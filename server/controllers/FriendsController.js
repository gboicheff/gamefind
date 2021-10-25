const axios = require('axios');
const randomColor = require('randomcolor');

function getFriends(req, res) {
    let url = 'http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=' + process.env.STEAM_API_KEY + '&steamid=' + req.params.steamID + '&relationship=friend'
    axios.get(url).then(response => {
        let friendIDs = response.data['friendslist']['friends'].map(friend => friend['steamid'])
        let url2 = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0001/?key=' + process.env.STEAM_API_KEY + '&steamids=' + friendIDs
        console.log(url2)
        axios.get(url2).then(response2 => {
            let friends = []
            const colors = randomColor({count: response2.data['response']['players']['player'].length})
            let index = 0
            response2.data['response']['players']['player'].forEach(user => {
                friends.push({
                    value: user['steamid'],
                    icon: user['avatar'],
                    name: user['personaname'],
                    color: colors[index]
                })
                index++
            })
            res.send(friends)
        })
    }).catch(error => console.log(error.response.data))
}
exports.getFriends = getFriends;