const randomColor = require('randomcolor');
const models = require('../models').models

function getCategoriesDB() {
    return models.Category.find()
}
function prepareCategories() {
    return getCategoriesDB().then(categories => {
        const colors = randomColor({count: Object.keys(categories).length})
        let dictList = []
        categories.forEach((category, index) => {
            const newDict = {}
            newDict['value'] = category['id']
            newDict['label'] = category['name']
            newDict['color'] = colors[index]
            dictList.push(newDict)
        })
        return dictList
    }).catch(error => {
        console.log(error)
    })
}

function getCategories(req, res) {
    prepareCategories().then(categories => {res.send(categories)})
}

exports.getCategories = getCategories;