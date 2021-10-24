const categories = {
    1 : "Multi-player",
    2 : "Single-player",
    8 : "Valve Anti-Cheat enabled",
    9 : "Co-op",
    13 : "Captions available",
    14 : "Commentary available",
    15 : "Stats",
    16 : "Includes Source SDK",
    17 : "Includes level editor",
    18 : "Partial Controller Support",
    20 : "MMO",
    22 : "Steam Achievements",
    23 : "Steam Cloud",
    24 : "Shared/Split Screen",
    25 : "Steam Leaderboards",
    27 : "Cross-Platform Multiplayer",
    28 : "Full controller support",
    29 : "Steam Trading Cards",
    30 : "Steam Workshop",
    35 : "In-App Purchases",
    36 : "Online PvP",
    38 : "Online Co-op",
    39 : "Shared/Split Screen Co-op",
    41 : "Remote Play on Phone",
    42 : "Remote Play on Tablet",
    43 : "Remote Play on TV",
    44 : "Remote Play Together",
    47 : "LAN PvP",
    48 : "LAN Co-op",
    49 : "PvP",
    51 : "Steam Workshop"
}

function revDict(d){
    var newDict = {}
    Object.keys(d).forEach(key => {
        newDict[d[key]] = key
    })
    return newDict
}
const revCategories = revDict(categories)

export {categories, revCategories}