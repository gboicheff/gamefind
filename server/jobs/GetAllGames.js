const axios = require('axios');
const models = require('../models').models
const connectDb = require('../models').connectDb
require("dotenv").config()
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

    let response = await axios.get(url)
    try{
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
    catch(error){
        return null
    }

    return null

}

async function fillGames(){
    var gameList = await getGameList()
    gameList = gameList.map(x => x.appid)
    await connectDb()
    var appIDs = await models.Game.find().select("appId")
    appIDs = appIDs.map(x => x.appId)
    let gamesToAdd = gameList.filter(x => !appIDs.includes(x))


    
    console.log("Games left to add: "  + gamesToAdd.length)
    for(let index = 0; index < gamesToAdd.length; index++){
        var game = gamesToAdd[index]
        var steamInfo = await getGameSteam(game)
        if(steamInfo){
            await saveGame(steamInfo)
            console.log({index: index, success:true, appID: game, name: steamInfo['name']})
            await new Promise(resolve => setTimeout(resolve, 5000))
        }
    }

}

async function main() {
    var gameList = await getGameList()
    connectDb().then(async() => {
        for(let index = 110696; index >= 0; index--){
            var game = gameList[index]
            var steamInfo = await getGameSteam(game.appid)
            if(steamInfo){
                console.log(steamInfo)
                await saveGame(steamInfo)
                console.log({index: index, success:true, appID: game.appid, name: steamInfo['name']})
                await new Promise(resolve => setTimeout(resolve, 4000))
            }
            else{
                console.log({index: index, success:false, appID: game.appid})
                await new Promise(resolve => setTimeout(resolve, 4000))
            }
        }
    })
    
}

  
if (require.main === module) {
    // main();
    fillGames()
}