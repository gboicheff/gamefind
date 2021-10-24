const axios = require('axios');
const models = require('../backend/models').models
const connectDb = require('../backend/models').connectDb

async function getGameList(){
    var gameList = await axios.get("http://api.steampowered.com/ISteamApps/GetAppList/v0002/")
    return gameList.data.applist.apps
}

function convertCategories(categories) {
    let ids = []
    if(typeof categories == "undefined") {
        return []
    }
    categories.forEach(category => {
        ids.push(parseInt(category['id']))
    })
    return ids
}

function saveGame(game) {
    game['lastUpdate'] = Date.now()
    game = new models.Game(game)
    return game.save().catch(err => console.log(err))
}

async function getGameSteam(appId) {
    let url = 'https://store.steampowered.com/api/appdetails?appids=' + appId.toString()
    console.log(url)

    let response = await axios.get(url)
    if(response.data[appId.toString()].success) {

        let categories = response.data[appId]['data']['categories']
        let genres = response.data[appId]['data']['genres']
        let name = response.data[appId]['data']['name']
        let thumbnail = response.data[appId]['data']['header_image']

        const game = {
            name: name,
            appId: appId,
            categories: convertCategories(categories),
            genres: convertCategories(genres),
            thumbnailLink: thumbnail,
            lastUpdate: Date.now()
        }

        return game

    }

    return null

}

async function main() {
    var gameList = await getGameList()
    connectDb().then(async() => {
        for(let index = 0; index < gameList.length; index++){
            var game = gameList[index]
            var steamInfo = await getGameSteam(game.appid)
            if(steamInfo){
                console.log(steamInfo)
                await saveGame(steamInfo)
                console.log({index: index, success:true, appID: game.appid, name: steamInfo['name']})
                await new Promise(resolve => setTimeout(resolve, 5000))
            }
            else{
                console.log({index: index, success:false, appID: game.appid})
                await new Promise(resolve => setTimeout(resolve, 5000))
            }
        }
    })
    
}
  
if (require.main === module) {
    main();
}