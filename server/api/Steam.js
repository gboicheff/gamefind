const {Categories, SharedGames, Link, Friends, GamesInfo, PlayerInfo, GameList} = require('../controllers/Controller')

const express = require('express');
const router = express.Router()

router.get('/friends/:steamID', Friends.getFriends)

router.get('/shared_multiplayer_games/:steamIDs/:categories', SharedGames.getSharedGames)

router.get('/categories', Categories.getCategories)

router.get('/game-list/:key', Link.serveLink)

router.get("/game-lists/:createdBy", GameList.getGameLists)

router.post('/gamesinfo', GamesInfo.getGamesInfo)

router.post("/playerinfo", PlayerInfo.getPlayerInfo)

module.exports = router 