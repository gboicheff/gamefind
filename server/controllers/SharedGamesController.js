const axios = require('axios');
const intersectionBy = require('lodash.intersectionby')
const models = require('../models').models


function check_categories(current_categories, expected_categories) {
    return intersectionBy(current_categories, expected_categories).length === expected_categories.length;
}

function generate_key() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

async function saveLink(key, games, IDs, categories) {
    const list = {
        key: key,
        gameAppIds: games,
        userIDs: IDs,
        categories: categories,
        createdAt: new Date()
    }
    const gameList = new models.GameList(list)
    await gameList.save()
}

async function saveGame(game) {
    game['lastUpdate'] = Date.now()
    game = new models.Game(game)
    await game.save()
}

function convertCategories(categories) {
    let ids = []
    categories.forEach(category => {
        ids.push(category['id'])
    })
    return ids
}

function getGameSteam(appId) {
    let url = 'https://store.steampowered.com/api/appdetails?appids=' + appId
    return axios.get(url).then(response => {
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
    }).catch(error => {return null})
}

function getGameDB(appID) {
    return models.Game.findOne({'appId': appID})
}

async function getGames(appIDs) {
    promises = []
    appIDs.forEach(appID => {
        const p2 = new Promise((res) => setTimeout(res,5000))
        const race = Promise.race([getGameDB(appID), p2])
        promises.push(race)
    })

    responses = await Promise.allSettled(promises)

    steamReqs = 2
    new_promises = []
    found_games = []

    responses.forEach((res, i) => {
        if(!res.value){
            if(steamReqs > 0){
                steamReqs--
                new_promises.push(getGameSteam(appIDs[i]))
            }
        }
        else{
            found_games.push(res)
        }
    })
    
    new_responses = await Promise.allSettled(new_promises)
    new_responses = new_responses.filter(resp => resp.status === "fulfilled" && resp.value)

    new_responses.forEach(async(resp) => {
        await saveGame(resp.value)
        found_games.push(resp)
    })

    return found_games
}

async function getSharedGames(req, res) {
    let owned_games = {}
    let steamIDs = req.params.steamIDs.split(",")
    let selected_categories = req.params.categories.split(",").map(x => parseInt(x))
    let promises = []
    let shared_games = []
    let multiplayer_games = []

    steamIDs.forEach(steamID => {
        let url = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + process.env.STEAM_API_KEY + '&steamid=' + steamID + '&format=json'
        const p1 = new Promise((res) => setTimeout(res,2000))
        const race = Promise.race([axios.get(url), p1])
        promises.push(race)
    })


    responses = await Promise.allSettled(promises)

    let privateCheck = true
    let privateSteamIDs = []
    responses.forEach((response, index) => {
        const currentCheck = Object.keys(response.value.data["response"]).length !== 0
        privateCheck = privateCheck && currentCheck
        if(!currentCheck){
            privateSteamIDs.push(steamIDs[index])
        }
    })



    if(privateCheck){
        // responses = responses.filter(promise => promise.status === "fulfilled") //handle failed promises
        responses.forEach(response => {
            response = response.value
            let games = response.data["response"]["games"].map(game => game["appid"])
            games.forEach(game => {
                if(game in owned_games) {
                    owned_games[game]+=1
                }
                else {
                    owned_games[game] = 1
                }
            })
        })


        for (const [key, value] of Object.entries(owned_games)) {
            if(value === steamIDs.length) {
                shared_games.push(key)
            }
        }

        games = await getGames(shared_games)


        games.forEach(async(response, index) => {
            const game = response.value
            let categories = game['categories']
            if(check_categories(categories, selected_categories)) {
                multiplayer_games.push(game)
            }
        })

        const key = generate_key()
        const ids = multiplayer_games.map(game => game['appId'])
        const body = {
            games: multiplayer_games,
            userIDs: steamIDs
        }
        const fullResponse = {
            body: body,
            key: key
        }
        res.send(fullResponse)
        await saveLink(key, ids, steamIDs, selected_categories)
    } else {
        const response = {
            privateSteamIDs: privateSteamIDs
        }
        res.status(404).send(response)
    }
}

exports.getSharedGames = getSharedGames;